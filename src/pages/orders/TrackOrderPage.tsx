import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../types';
import { getOrderById } from '../../services/orderService';
export default function TrackOrderPage(){ const {id}=useParams(); const [order,setOrder]=useState<Order|undefined>(); useEffect(()=>{ if(id) getOrderById(Number(id)).then(setOrder); },[id]); if(!order) return <div className="max-w-3xl mx-auto py-10"><div className="card">Order not found</div></div>; return <div className="max-w-3xl mx-auto py-10"><div className="card"><h1 className="text-2xl font-bold">Track Order #{order.id}</h1><p className="mt-3">Current Status: <b className="text-orange-600">{order.status}</b></p><p>Delivery Address: {order.deliveryAddress}</p><p>Payment: {order.paymentMethod}</p></div></div> }
