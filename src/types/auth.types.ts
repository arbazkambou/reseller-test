export interface LoginUserInputType {
  email: string;
  password: string;
}

// export interface AdminRole {
//   nonce: string;
//   type: string;
// }

export interface LoginUserType {
  id: string;
  name: string;
  email: string;
  balance: number;
  // role_id: number;
  // updated_at: string;
  // created_at: string;
  // email_verified_at: string;
  // blocked: string | null;
  // deleted_at: string | null;
  // image_url: string | null;
  // phone_number: string | null;
  // access_token: string;
  // emailVerified: Date;
}

export interface LoginUserResponseType {
  status: boolean;
  message: string;
  errors?: string[];
  access_token: string;
  user: LoginUserType;
  // data: AdminRole;
}
