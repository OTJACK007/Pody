-- Create or replace the signup trigger function
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into user_settings with default billing values
  INSERT INTO public.user_settings (
    user_id,
    billing
  ) VALUES (
    NEW.id,
    jsonb_build_object(
      'subscription', jsonb_build_object(
        'plan', 'free',
        'amount', 0,
        'status', 'inactive', 
        'currency', 'USD',
        'nextBillingDate', '2077-01-05T00:43:25.000Z'
      )
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;