import React from "react";
import { useDispatch } from "react-redux";
import { addToCartLocal } from "../Slice/CartSlice";


const FoodItems = ({ _id, name, price, description, image, user }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
  addToCartLocal({
    item: { _id, name, price, description, image },
    userId: user?.id
  })
);

  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-white shadow-lg rounded-full p-3"
        >
          🛒
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-500 text-sm">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-semibold text-lg">${price}</span>

          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
