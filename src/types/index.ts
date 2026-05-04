export type UserRole = "CUSTOMER" | "DRIVER" | "OWNER" | "ADMIN";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  id: number | string;
  fullName: string;
  name?: string;
  email: string;
  role: UserRole;
  nicNumber?: string;
  nic?: string;
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

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface FoodItem {
  id: number | string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  image?: string;
  categoryId?: number;
  category?: string;
  available?: boolean;
}

export interface CartItem {
  id: string;
  food: FoodItem;
  quantity: number;
}

export type PaymentMethod = "Cash on Delivery" | "Card Payment" | "Bank Transfer" | string;

export interface OrderItemRequest {
  foodId: number | string;
  quantity: number;
}

export interface Order {
  id: number | string;
  items: any[];
  totalAmount?: number;
  total?: number;
  status: string;
  deliveryAddress?: string;
  address?: string;
  paymentMethod?: PaymentMethod;
  phoneNumber?: string;
  createdAt?: string;
  deliveredAt?: string;
}