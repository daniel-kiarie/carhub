import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authReady) return;
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, authReady, navigate]);

  const [formData, setFormData] = useState({
    title: "", brand: "", model: "", year: "", price: "",
    mileage: "", fuelType: "", transmission: "", color: "",
    description: "", imageUrl: "", featured: false, instock: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      await axios.post("/api/cars", formData, config);

      setMessage({ type: "success", text: "Car added successfully!" });

      setFormData({
        title: "", brand: "", model: "", year: "", price: "",
        mileage: "", fuelType: "", transmission: "", color: "",
        description: "", imageUrl: "", featured: false, instock: true,
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to add car. Check admin access.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  if (!authReady) return null;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Car Listing</h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Car Title" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />

        <div className="grid grid-cols-2 gap-4">
          <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required className="border p-2 rounded" />
          <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" required className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Year" required className="border p-2 rounded" />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price (KES)" required className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="Mileage" required className="border p-2 rounded" />
          <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" required className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="fuelType" value={formData.fuelType} onChange={handleChange} required className="border p-2 rounded">
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select name="transmission" value={formData.transmission} onChange={handleChange} required className="border p-2 rounded">
            <option value="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required rows={3} className="border p-2 rounded" />

        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required className="border p-2 rounded" />

        <div className="flex gap-6 py-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="instock" checked={formData.instock} onChange={handleChange} />
            In Stock
          </label>
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400">
          {loading ? "Saving Car..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;