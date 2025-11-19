import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setCart,
  addToCartLocal,
  decreaseQuantityLocal,
  removeFromCartLocal,
  clearCartLocal,
  syncCartWithBackend
} from "../../components/Slice/CartSlice";
import { placeOrder } from "../../components/Slice/placeOrder";
import { useNavigate } from "react-router-dom";

const Cart = ({ user }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items) || [];
  const navigate = useNavigate();

  /* -------------------------
     Load Cart from Backend
  ------------------------- */
  useEffect(() => {
    if (!user) return;

    axios
      .get(`/api/cart/${user.id}`)
      .then((res) => dispatch(setCart(res.data.items)))
      .catch((err) => console.error(err));
  }, [user, dispatch]);

  /* -------------------------
     Sync Redux changes to Backend
  ------------------------- */
  const sync = (updatedItems) => {
    if (!user) return;
    dispatch(syncCartWithBackend(user.id, updatedItems));
  };

  const add = (item) => {
    dispatch(addToCartLocal({ item }));
    const updated = items.map(i =>
      i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
    );
    sync(updated);
  };

  const decrease = (id) => {
    const updated = items
      .map(i => i._id === id ? { ...i, quantity: Math.max(i.quantity - 1, 0) } : i)
      .filter(i => i.quantity > 0);

    dispatch(decreaseQuantityLocal(id));
    sync(updated);
  };

  const remove = (id) => {
    const updated = items.filter(i => i._id !== id);
    dispatch(removeFromCartLocal(id));
    sync(updated);
  };

  const getTotal = () =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (!user || items.length === 0) return;

    dispatch(placeOrder({ items, totalAmount: getTotal() }));
    dispatch(clearCartLocal());

    // Clear cart in backend
    await axios.delete(`/api/cart/${user.id}`);
    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <div className="flex justify-between mb-4">
        <button onClick={() => navigate("/")} className="text-blue-600">← Back</button>
        <button onClick={() => navigate("/orders")} className="text-green-600">Orders →</button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Your Cart 🛒</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="flex items-center justify-between bg-white shadow p-5 rounded-xl mb-4">
            <img src={item.image} className="w-24 h-24 rounded-lg" alt="" />
            <div className="flex-1 ml-4">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-green-600 font-bold">${item.price}</p>

              <div className="flex items-center gap-4 mt-3">
                <button onClick={() => decrease(item._id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span className="font-semibold">{item.quantity}</span>
                <button onClick={() => add(item)} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>

            <button onClick={() => remove(item._id)} className="text-red-500 text-xl">✖</button>
          </div>
        ))
      )}

      {items.length > 0 && (
        <div className="bg-gray-100 mt-6 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-bold">Total: ${getTotal()}</h3>
          <button onClick={handleCheckout} className="bg-green-600 text-white px-6 py-3 rounded-xl mt-4">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
