import { useEffect, useState } from 'react';
import FoodCard from '../../components/foods/FoodCard';
import FoodFilter from '../../components/foods/FoodFilter';
import Loading from '../../components/common/Loading';
import { Category, FoodItem } from '../../types';
import { getFoods } from '../../services/foodService';
import { getCategories } from '../../services/categoryService';
export default function FoodsPage(){ const [foods,setFoods]=useState<FoodItem[]>([]); const [categories,setCategories]=useState<Category[]>([]); const [search,setSearch]=useState(''); const [categoryId,setCategoryId]=useState(''); const [loading,setLoading]=useState(false); useEffect(()=>{getCategories().then(setCategories)},[]); useEffect(()=>{setLoading(true); getFoods(search,categoryId).then(setFoods).finally(()=>setLoading(false));},[search,categoryId]); return <div className="max-w-6xl mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-5">Foods</h1><FoodFilter search={search} setSearch={setSearch} categoryId={categoryId} setCategoryId={setCategoryId} categories={categories}/>{loading?<Loading/>:<div className="grid md:grid-cols-3 gap-5 mt-6">{foods.map(f=><FoodCard key={f.id} food={f}/>)}</div>}</div> }
