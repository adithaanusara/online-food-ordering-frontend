import { createContext, useContext, useMemo, useState } from 'react';
import { CartItem, FoodItem } from '../types';
interface CartContextValue { items: CartItem[]; addToCart:(food:FoodItem)=>void; updateQuantity:(id:number,qty:number)=>void; removeItem:(id:number)=>void; clearCart:()=>void; total:number; }
const CartContext=createContext<CartContextValue|null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<CartItem[]>([]);
 function addToCart(food:FoodItem){ setItems(prev=>{ const ex=prev.find(i=>i.food.id===food.id); return ex ? prev.map(i=>i.food.id===food.id?{...i,quantity:i.quantity+1}:i) : [...prev,{food,quantity:1}]; });}
 function updateQuantity(id:number,qty:number){ if(qty<=0) return removeItem(id); setItems(prev=>prev.map(i=>i.food.id===id?{...i,quantity:qty}:i));}
 function removeItem(id:number){ setItems(prev=>prev.filter(i=>i.food.id!==id));}
 function clearCart(){ setItems([]);}
 const total=useMemo(()=>items.reduce((sum,i)=>sum+i.food.price*i.quantity,0),[items]);
 return <CartContext.Provider value={{items,addToCart,updateQuantity,removeItem,clearCart,total}}>{children}</CartContext.Provider>;
}
export function useCart(){ const ctx=useContext(CartContext); if(!ctx) throw new Error('useCart must be used inside CartProvider'); return ctx; }
