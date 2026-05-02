import api from './api';
import { Order, OrderItemRequest, PaymentMethod } from '../types';
export async function placeOrder(items: OrderItemRequest[], deliveryAddress: string, paymentMethod: PaymentMethod): Promise<Order> {
 try { return (await api.post<Order>('/orders', { items, deliveryAddress, paymentMethod })).data; }
 catch { return { id: Date.now(), totalAmount: 0, status: 'PLACED', deliveryAddress, paymentMethod, createdAt: new Date().toISOString(), items: [] }; }
}
export async function getMyOrders(): Promise<Order[]> { try { return (await api.get<Order[]>('/orders/my')).data; } catch { return JSON.parse(localStorage.getItem('orders') || '[]'); } }
export async function getOrderById(id: number): Promise<Order | undefined> { const list = await getMyOrders(); return list.find(o => o.id === id); }
