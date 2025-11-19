import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
