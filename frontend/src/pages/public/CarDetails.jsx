import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useFavourites } from "../../context/FavouritesContext";
import { Heart, Pencil, Trash2, X, Phone } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavourited, toggleFavourite } = useFavourites();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [editMessage, setEditMessage] = useState({ type: "", text: "" });

  const isAdmin = user?.role === "admin" || user?.isAdmin;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`https://carhub-269k.onrender.com/api/cars/${id}`);
        setCar(data);
        setEditData(data);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${car.title}"?`)) return;
    try {
      await axios.delete(`https://carhub-269k.onrender.com/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      navigate("/cars");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete car.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setEditMessage({ type: "", text: "" });
    try {
      const { data } = await axios.put(
        `https://carhub-269k.onrender.com/api/cars/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setCar(data);
      setEditMessage({ type: "success", text: "Car updated successfully!" });
      setTimeout(() => setShowEditModal(false), 1000);
    } catch (error) {
      setEditMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update car.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!car) return <div className="text-center p-10">Car not found.</div>;

  const favourited = isFavourited(car._id);

  const whatsappUrl = "https://wa.me/254796147140?text=Hi, I am interested in the " + encodeURIComponent(car.title) + " listed on CarHub.";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src={car.imageUrl} alt={car.title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{car.title}</h1>
              <p className="text-blue-600 text-2xl font-bold mt-2">
                KES {car.price?.toLocaleString()}
              </p>
            </div>

            {/* Favourite button */}
            {user && (
              <button
                onClick={() => toggleFavourite(car)}
                title={favourited ? "Remove from favourites" : "Add to favourites"}
                className={`p-3 border rounded-full transition ${
                  favourited ? "bg-red-50 border-red-200" : "border-gray-200 hover:bg-red-50"
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    favourited ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 border-y py-6">
            <div><span className="text-gray-500">Brand</span><p className="font-semibold">{car.brand}</p></div>
            <div><span className="text-gray-500">Fuel</span><p className="font-semibold">{car.fuelType}</p></div>
            <div><span className="text-gray-500">Mileage</span><p className="font-semibold">{car.mileage?.toLocaleString()} km</p></div>
            <div><span className="text-gray-500">Transmission</span><p className="font-semibold">{car.transmission}</p></div>
            <div><span className="text-gray-500">Year</span><p className="font-semibold">{car.year}</p></div>
            <div><span className="text-gray-500">Color</span><p className="font-semibold">{car.color}</p></div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-3">
            <a href="tel:+254796147140" className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Seller
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {isAdmin && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                <Pencil className="w-4 h-4" /> Edit Car
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete Car
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Car</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-700 transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {editMessage.text && (
              <div className={`mb-4 p-3 rounded ${
                editMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {editMessage.text}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input name="title" value={editData.title || ""} onChange={handleEditChange} placeholder="Car Title" required className="border p-2 rounded" />

              <div className="grid grid-cols-2 gap-4">
                <input name="brand" value={editData.brand || ""} onChange={handleEditChange} placeholder="Brand" required className="border p-2 rounded" />
                <input name="model" value={editData.model || ""} onChange={handleEditChange} placeholder="Model" required className="border p-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="year" type="number" value={editData.year || ""} onChange={handleEditChange} placeholder="Year" required className="border p-2 rounded" />
                <input name="price" type="number" value={editData.price || ""} onChange={handleEditChange} placeholder="Price" required className="border p-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="mileage" type="number" value={editData.mileage || ""} onChange={handleEditChange} placeholder="Mileage" required className="border p-2 rounded" />
                <input name="color" value={editData.color || ""} onChange={handleEditChange} placeholder="Color" required className="border p-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select name="fuelType" value={editData.fuelType || ""} onChange={handleEditChange} required className="border p-2 rounded">
                  <option value="">Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select name="transmission" value={editData.transmission || ""} onChange={handleEditChange} required className="border p-2 rounded">
                  <option value="">Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <textarea name="description" value={editData.description || ""} onChange={handleEditChange} placeholder="Description" required rows={3} className="border p-2 rounded resize-none" />
              <input name="imageUrl" value={editData.imageUrl || ""} onChange={handleEditChange} placeholder="Image URL" required className="border p-2 rounded" />

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="featured" checked={editData.featured || false} onChange={handleEditChange} className="w-4 h-4" />
                  Featured
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="instock" checked={editData.instock ?? true} onChange={handleEditChange} className="w-4 h-4" />
                  In Stock
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 border border-gray-300 py-2 rounded-xl font-bold hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;