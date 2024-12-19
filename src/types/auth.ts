export interface SignUpData {
  email: string;
  password: string;
  fullname: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  fullname: string;
  profile_picture?: string;
  phone_number?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}