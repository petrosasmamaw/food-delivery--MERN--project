import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoods } from "../Slice/StoreSlice";
import FoodItems from "../FoodItems/FoodItems";

const FoodDisplay = ({ category, user }) => {
  const dispatch = useDispatch();
  const { foods, loading } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg">Loading foods...</p>;

  return (
    <div id="food-display" className="py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Top dishes near you
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods
          .filter((food) => category === "All" || food.category === category)
          .map((food) => (
            <FoodItems
              key={food._id}
              _id={food._id}
              name={food.name}
              price={food.price}
              description={food.description}
              image={`http://localhost:5000${food.image}`} // 🔥 Important fix!
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
