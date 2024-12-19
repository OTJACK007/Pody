-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_avatar TEXT := 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png';
BEGIN
  -- Create profile with proper metadata handling
  INSERT INTO public.profiles (
    id,
    fullname,
    email,
    profile_picture
  ) VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.email
    ),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      default_avatar
    )
  );

  -- Create user settings with proper defaults
  INSERT INTO public.user_settings (
    user_id,
    theme,
    color_scheme,
    notifications,
    language,
    privacy
  ) VALUES (
    NEW.id,
    'dark',
    '#ff3366',
    jsonb_build_object(
      'browser', true,
      'categories', '{}',
      'content', jsonb_build_object(
        'new-episodes', true,
        'recommendations', true,
        'trending', true
      ),
      'social', jsonb_build_object(
        'follows', true,
        'mentions', true,
        'replies', true
      ),
      'system', jsonb_build_object(
        'maintenance', false,
        'security', true,
        'updates', true,
        'email', true,
        'emailFrequency', 'immediate',
        'mobile', false,
        'quietHours', jsonb_build_object(
          'enabled', false,
          'end', '07:00',
          'start', '22:00',
          'sound', true
        )
      )
    ),
    jsonb_build_object(
      'language', 'en',
      'region', 'US',
      'timeZone', 'auto',
      'dateFormat', 'MM/DD/YYYY'
    ),
    jsonb_build_object(
      'password_authentication', jsonb_build_object(
        'change_password', true,
        'phone_number_authentication', jsonb_build_object(
          'enabled', false,
          'phone_number', '',
          'verified', false
        ),
        'authenticator_app', jsonb_build_object(
          'enabled', false,
          'qr_code_url', '',
          'last_used', now()
        )
      ),
      'privacy_settings', jsonb_build_object(
        'show_profile', true,
        'allow_listening_activity', false,
        'share_library', true,
        'allow_friend_requests', true
      ),
      'security_log', '[]'
    )
  );

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fix any existing users without profiles or settings
DO $$
BEGIN
  -- Create missing profiles
  INSERT INTO public.profiles (id, fullname, email, profile_picture)
  SELECT DISTINCT
    u.id,
    COALESCE(u.raw_user_meta_data->>'full_name', u.email),
    u.email,
    COALESCE(
      u.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    )
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.id = u.id
  WHERE p.id IS NULL;

  -- Create missing settings
  INSERT INTO public.user_settings (
    user_id,
    theme,
    color_scheme
  )
  SELECT DISTINCT
    p.id,
    'dark',
    '#ff3366'
  FROM public.profiles p
  LEFT JOIN public.user_settings s ON s.user_id = p.id
  WHERE s.user_id IS NULL;
END $$;