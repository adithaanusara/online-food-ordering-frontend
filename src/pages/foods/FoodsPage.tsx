import { useState } from "react";
import { foods } from "../../data/foods";

export default function FoodsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = ["ALL", ...Array.from(new Set(foods.map((f) => f.category)))];

  const filteredFoods = foods.filter((food) => {
    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "ALL" || food.category === category;

    return matchSearch && matchCategory;
  });

  const addToCart = (food: (typeof foods)[0]) => {
    const cart = JSON.parse(localStorage.getItem("food_cart") || "[]");

    const existingItem = cart.find((item: any) => item.id === food.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item: any) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...food, quantity: 1 }];
    }

    localStorage.setItem("food_cart", JSON.stringify(updatedCart));
    alert(`${food.name} added to cart`);
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Available Foods</h1>
      <p className="text-slate-600 mt-2">
        Browse foods, filter by category and add items to your cart.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <input
          type="text"
          placeholder="Search foods..."
          className="border rounded-lg px-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "ALL" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {filteredFoods.map((food) => (
          <div key={food.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-slate-800">
                  {food.name}
                </h2>

                <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {food.category}
                </span>
              </div>

              <p className="text-slate-600 mt-2">{food.description}</p>

              <div className="flex justify-between items-center mt-5">
                <p className="text-lg font-bold text-orange-500">
                  Rs. {food.price}
                </p>

                <button
                  onClick={() => addToCart(food)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No foods found.</p>
      )}
    </div>
  );
}