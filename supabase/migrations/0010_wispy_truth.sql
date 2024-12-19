-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update trigger function with proper error handling and default values
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
DECLARE
  default_avatar TEXT := 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png';
BEGIN
  -- Log the incoming data for debugging
  RAISE LOG 'New user signup - ID: %, Email: %, Metadata: %', 
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data;

  -- Insert into profiles with proper error handling
  BEGIN
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
    RAISE LOG 'Profile created successfully for user %', NEW.id;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating profile: %', SQLERRM;
  END;

  -- Insert into user_settings with proper error handling
  BEGIN
    INSERT INTO public.user_settings (
      user_id,
      appearance,
      notifications,
      language,
      privacy
    ) VALUES (
      NEW.id,
      jsonb_build_object(
        'theme', 'dark',
        'colorScheme', '#ff3366'
      ),
      jsonb_build_object(
        'browser', true,
        'categories', jsonb_build_object(),
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
        'security_log', '[]'::jsonb
      )
    );
    RAISE LOG 'User settings created successfully for user %', NEW.id;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating user settings: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_signup();

-- Fix any existing users without settings
DO $$
BEGIN
  INSERT INTO public.user_settings (
    user_id,
    appearance,
    notifications,
    language,
    privacy
  )
  SELECT 
    p.id,
    jsonb_build_object(
      'theme', 'dark',
      'colorScheme', '#ff3366'
    ),
    jsonb_build_object(
      'browser', true,
      'categories', jsonb_build_object(),
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
      'security_log', '[]'::jsonb
    )
  FROM public.profiles p
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_settings s WHERE s.user_id = p.id
  );
END $$;