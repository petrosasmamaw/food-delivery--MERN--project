import Cart from "../models/cart.js";

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update cart (sync)
export const updateCart = async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) cart.items = items;
    else cart = new Cart({ userId, items });

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear cart
export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
