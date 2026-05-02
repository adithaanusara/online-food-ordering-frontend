import api from './api';
import { FoodItem } from '../types';
const mockFoods: FoodItem[] = [
 { id:1, name:'Chicken Fried Rice', description:'Spicy chicken fried rice', price:950, imageUrl:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600', categoryId:1, available:true },
 { id:2, name:'Cheese Burger', description:'Beef patty with cheese', price:1200, imageUrl:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', categoryId:2, available:true },
 { id:3, name:'Fresh Orange Juice', description:'Natural fresh juice', price:450, imageUrl:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600', categoryId:3, available:true }
];
export async function getFoods(search = '', categoryId = '') {
 try { return (await api.get<FoodItem[]>('/foods', { params: { search, categoryId } })).data; }
 catch { return mockFoods.filter(f => (!search || f.name.toLowerCase().includes(search.toLowerCase())) && (!categoryId || String(f.categoryId) === categoryId)); }
}
