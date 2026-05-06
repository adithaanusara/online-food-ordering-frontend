import { FoodItem } from "../../types";

type FoodCardProps = {
  food: FoodItem;
  addToCart: (food: FoodItem) => void;
};

export default function FoodCard({ food, addToCart }: FoodCardProps) {
  const image = food.image || food.imageUrl || "";
  const category = String(food.category || "Food");
  const available = food.available !== false;

  return (
    <article className="food-card">
      <div className="food-card-image">
        <img src={image} alt={food.name} />
        <span>{category}</span>
      </div>

      <div className="food-card-body">
        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-card-bottom">
          <strong>LKR {food.price.toLocaleString()}</strong>

          <button
            type="button"
            className="add-cart-btn"
            disabled={!available}
            onClick={() => addToCart(food)}
          >
            {available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </article>
  );
}