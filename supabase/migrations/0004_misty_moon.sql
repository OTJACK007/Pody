-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  appearance jsonb DEFAULT jsonb_build_object(
    'colorScheme', '#ff3366',
    'theme', 'dark'
  ),
  billing jsonb DEFAULT jsonb_build_object(
    'subscription', jsonb_build_object(
      'amount', 5,
      'currency', 'USD',
      'nextBillingDate', '2025-01-05T00:43:25.000Z',
      'plan', 'basic',
      'status', 'active'
    )
  ),
  language jsonb DEFAULT jsonb_build_object(
    'dateFormat', 'MM/DD/YYYY',
    'language', 'en',
    'region', 'US',
    'timeZone', 'auto'
  ),
  notifications jsonb DEFAULT jsonb_build_object(
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
      'email', true,
      'emailFrequency', 'immediate',
      'maintenance', false,
      'mobile', false,
      'quietHours', jsonb_build_object(
        'enabled', false,
        'end', '07:00',
        'sound', true,
        'start', '22:00'
      ),
      'security', true,
      'updates', true
    )
  ),
  privacy jsonb DEFAULT jsonb_build_object(
    'password_authentication', jsonb_build_object(
      'authenticator_app', jsonb_build_object(
        'enabled', false,
        'last_used', '2024-12-06T00:43:25.000Z',
        'qr_code_url', ''
      ),
      'change_password', true,
      'phone_number_authentication', jsonb_build_object(
        'enabled', false,
        'phone_number', '',
        'verified', false
      )
    ),
    'privacy_settings', jsonb_build_object(
      'allow_friend_requests', true,
      'allow_listening_activity', false,
      'share_library', true,
      'show_profile', true
    ),
    'security_log', '[]'
  ),
  profile_picture text DEFAULT 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON user_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON user_settings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Function to create user settings on signup
CREATE OR REPLACE FUNCTION create_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger to automatically create user settings on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_settings();