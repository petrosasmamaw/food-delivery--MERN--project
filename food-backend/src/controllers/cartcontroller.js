// controllers/cartController.js
import Cart from "../models/cart.js";

// GET cart by user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update cart
export const updateCart = async (req, res) => {
  const { userId } = req.params;   // <-- A: userId from params
  const { items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.json({ items: cart.items });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE cart (clear)
export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
