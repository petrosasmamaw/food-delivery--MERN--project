import Food from "../models/food.js";

// GET all foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET foods by category
export const getFoodsByCategory = async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.category });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single food by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE food
// CREATE food
export const createFood = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const newFood = new Food({
      name,
      price,
      description,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// UPDATE food
export const updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFood) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE food
export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
