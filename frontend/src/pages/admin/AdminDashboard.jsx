import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ cars: 0, users: 0, totalValue: 0 });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: carsData } = await axios.get("/api/cars");
        setCars(carsData);
        const totalValue = carsData.reduce(
          (sum, car) => sum + (car.price || 0),
          0,
        );
        setStats((prev) => ({
          ...prev,
          cars: carsData.length,
          totalValue,
        }));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Control Panel</h1>
        <Link
          to="/admin/add-car"
          className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          + Add New Car
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <p className="text-sm opacity-80 font-medium">Total Cars</p>
          <h3 className="text-3xl font-bold mt-1">
            {loading ? "..." : stats.cars}
          </h3>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <p className="text-sm opacity-80 font-medium">
            Total Inventory Value
          </p>
          <h3 className="text-3xl font-bold mt-1">
            {loading ? "..." : `KES ${stats.totalValue.toLocaleString()}`}
          </h3>
        </div>
        <div className="bg-emerald-500 text-white p-6 rounded-xl shadow-lg">
          <p className="text-sm opacity-80 font-medium">In Stock</p>
          <h3 className="text-3xl font-bold mt-1">
            {loading ? "..." : cars.filter((c) => c.instock).length}
          </h3>
        </div>
      </div>


      {/* Recent Listings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 font-bold">Recent Listings</div>
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Loading...
          </div>
        ) : cars.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm italic">
            No cars listed yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Car</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Year</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars.slice(0, 10).map((car) => (
                <tr key={car._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{car.title}</td>
                  <td className="p-4 text-gray-500">{car.brand}</td>
                  <td className="p-4 text-gray-500">{car.year}</td>
                  <td className="p-4 text-gray-500">
                    KES {car.price?.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        car.instock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.instock ? "In Stock" : "Sold"}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/cars/${car._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
