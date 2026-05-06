import api from "./api";
import { Order, PaymentMethod } from "../types";
import { CartItem } from "../context/CartContext";

type BackendOrderItem = {
  id: number;
  quantity: number;
  price: number;
  foodItem?: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
};

type BackendOrder = {
  id: number;
  deliveryAddress: string;
  totalAmount: number;
  createdAt: string;
  deliveredAt?: string;
  status: string;
  orderItems?: BackendOrderItem[];
};

function mapOrder(order: BackendOrder, paymentMethod = "Cash on Delivery"): Order {
  return {
    id: order.id,
    deliveryAddress: order.deliveryAddress,
    totalAmount: order.totalAmount,
    total: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt,
    deliveredAt: order.deliveredAt,
    paymentMethod,
    items: (order.orderItems || []).map((item) => ({
      id: String(item.foodItem?.id || item.id),
      name: item.foodItem?.name || "Food Item",
      price: item.price,
      quantity: item.quantity,
      image: item.foodItem?.imageUrl,
    })),
  };
}

export async function placeBackendOrder(
  cartItems: CartItem[],
  deliveryAddress: string,
  paymentMethod: PaymentMethod
): Promise<Order> {
  for (const item of cartItems) {
    await api.post("/cart/items", {
      foodItemId: Number(item.id),
      quantity: item.quantity,
    });
  }

  const orderResponse = await api.post<BackendOrder>("/orders", {
    deliveryAddress,
  });

  const order = orderResponse.data;

  try {
    await api.post("/payments", {
      orderId: order.id,
      paymentMethod,
    });
  } catch {
    // Payment fallback ignored for local demo.
  }

  return mapOrder(order, paymentMethod);
}

export async function getMyOrders(): Promise<Order[]> {
  try {
    const response = await api.get<BackendOrder[]>("/orders/my");
    return response.data.map((order) => mapOrder(order));
  } catch {
    return JSON.parse(localStorage.getItem("foodexpress_orders") || "[]");
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const response = await api.get<BackendOrder[]>("/orders");
    return response.data.map((order) => mapOrder(order));
  } catch {
    return JSON.parse(localStorage.getItem("foodexpress_orders") || "[]");
  }
}

export async function getOrderById(
  id: number | string
): Promise<Order | undefined> {
  const list = await getMyOrders();
  return list.find((order) => String(order.id) === String(id));
}