// src/pages/Cart/Cart.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, decreaseItem, removeItem, syncCart } from "../../components/Slice/CartSlice";

const Cart = ({ user }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const updateServer = (updatedItems) => {
    if (user?.id) {
      dispatch(syncCart({ userId: user.id, items: updatedItems }));
    }
  };

  const increase = (item) => {
    dispatch(addItem(item));
    updateServer(items.map((i) => ({ ...i })));
  };

  const decrease = (id) => {
    dispatch(decreaseItem(id));
    updateServer(items.map((i) => ({ ...i })));
  };

  const remove = (id) => {
    const updated = items.filter((i) => i._id !== id);
    dispatch(removeItem(id));
    updateServer(updated);
  };

  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 pt-32">
  {/* ...rest of the code */}


    <div className="max-w-5xl mx-auto p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
        >
          ← Back to Home
        </Link>
        <Link
          to="/orders"
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl shadow-md transition"
        >
          My Orders →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in cart</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white shadow-md rounded-2xl transition-all hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 mt-1">${item.price}</p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decrease(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => increase(item)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => remove(item._id)}
                className="mt-3 sm:mt-0 sm:ml-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 flex justify-end items-center gap-4">
          <span className="text-xl font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </span>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-2xl shadow-lg transition">
            Checkout
          </button>
        </div>
      )}
    </div></div>
  );
};

export default Cart;
