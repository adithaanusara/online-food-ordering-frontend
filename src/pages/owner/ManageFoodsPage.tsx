import { useState } from "react";

interface Food {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function ManageFoodsPage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: "Chicken Fried Rice", category: "Rice", price: 1200 },
    { id: 2, name: "Cheese Burger", category: "Burger", price: 950 },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const addFood = () => {
    if (!name || !category || !price) return;

    const newFood: Food = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
    };

    setFoods([...foods, newFood]);
    setName("");
    setCategory("");
    setPrice("");
  };

  const deleteFood = (id: number) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Manage Foods</h1>

      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-bold text-slate-800">Add Food</h2>

        <div className="grid md:grid-cols-4 gap-4 mt-4">
          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={addFood}
            className="bg-orange-500 text-white rounded-lg font-bold"
          >
            Add Food
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Food Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr key={food.id} className="border-b">
                <td className="p-4">{food.name}</td>
                <td className="p-4">{food.category}</td>
                <td className="p-4">Rs. {food.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteFood(food.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
