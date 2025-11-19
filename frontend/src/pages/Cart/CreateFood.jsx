import { useState } from "react";
import axios from "axios";

const FoodCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/foods", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Food Added Successfully!");

    // ✅ CLEAR FORM AFTER SUCCESS
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    setPreview("");

    // Optional: clear file input manually
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Food Item 🍽️
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium">Food Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              className="w-full mt-1 p-3 border rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-3 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Food Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-40 h-40 object-cover rounded-xl shadow"
              />
            )}
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700">
            Add Food
          </button>

        </form>

      </div>
    </div>
  );
};

export default FoodCreate;
