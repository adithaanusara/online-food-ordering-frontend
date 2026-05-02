import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types';
import { getMyOrders } from '../../services/orderService';
export default function OrdersPage(){ const [orders,setOrders]=useState<Order[]>([]); useEffect(()=>{getMyOrders().then(setOrders)},[]); return <div className="max-w-4xl mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-5">My Orders</h1><div className="grid gap-4">{orders.length===0?<div className="card">No orders yet.</div>:orders.map(o=><div className="card" key={o.id}><div className="flex justify-between"><b>Order #{o.id}</b><span>{o.status}</span></div><p>LKR {o.totalAmount.toFixed(2)}</p><p>{o.deliveryAddress}</p><Link className="text-orange-600" to={`/orders/${o.id}`}>Track Order</Link></div>)}</div></div> }
