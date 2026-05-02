export type UserRole = "CUSTOMER" | "DRIVER" | "OWNER";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;

  // Driver only fields
  nicNumber?: string;
  gender?: Gender;
  phone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "DRIVER";

  nicNumber?: string;
  gender?: Gender;
  phone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
}

export interface SignInData {
  email: string;
  password: string;
}