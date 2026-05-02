import { Link } from 'react-router-dom';
import CartItemRow from '../../components/cart/CartItemRow';
import { useCart } from '../../context/CartContext';
export default function CartPage(){ const {items,total}=useCart(); return <div className="max-w-4xl mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-5">Cart</h1>{items.length===0?<div className="card">Cart is empty. <Link className="text-orange-600" to="/foods">Browse foods</Link></div>:<div className="grid gap-4">{items.map(i=><CartItemRow key={i.food.id} item={i}/>) }<div className="card flex justify-between items-center"><b>Total: LKR {total.toFixed(2)}</b><Link to="/checkout" className="btn">Checkout</Link></div></div>}</div> }
