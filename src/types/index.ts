export type Role = 'CUSTOMER' | 'ADMIN';
export interface User { id: number; name: string; email: string; role: Role; }
export interface AuthResponse { token: string; user: User; }
export interface Category { id: number; name: string; description?: string; }
export interface FoodItem { id: number; name: string; description: string; price: number; imageUrl: string; categoryId: number; available: boolean; }
export interface CartItem { food: FoodItem; quantity: number; }
export type PaymentMethod = 'CASH_ON_DELIVERY' | 'CARD';
export interface OrderItemRequest { foodItemId: number; quantity: number; }
export interface Order { id: number; totalAmount: number; status: string; deliveryAddress: string; paymentMethod: PaymentMethod; createdAt: string; items: CartItem[]; }
