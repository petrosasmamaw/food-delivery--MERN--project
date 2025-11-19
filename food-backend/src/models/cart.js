import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
