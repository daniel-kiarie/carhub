import { useAuth } from "../../context/AuthContext";
import { useFavourites } from "../../context/FavouritesContext";
import { useNavigate } from "react-router-dom";
import { Heart, BadgeCheck, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { favourites } = useFavourites();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-500 mt-1">
            {isAdmin
              ? "Manage your platform from here."
              : "Manage your account and saved cars here."}
          </p>
        </div>
        <button
          onClick={logout}
          className="mt-4 md:mt-0 bg-red-50 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* USER: show favourites count */}
        {!isAdmin && (
          <button
            onClick={() => navigate("/favourites")}
            className="bg-blue-600 text-white p-6 rounded-xl shadow-md text-left hover:bg-blue-700 transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm opacity-80">Favorite Cars</p>
              <Heart className="w-5 h-5 opacity-60 group-hover:opacity-100 transition" />
            </div>
            <h3 className="text-4xl font-bold">{favourites.length}</h3>
            <p className="text-xs opacity-60 mt-2 flex items-center gap-1">
              View saved cars <ArrowRight className="w-3 h-3" />
            </p>
          </button>
        )}

        {/* ADMIN: quick links */}
        {isAdmin && (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="bg-blue-600 text-white p-6 rounded-xl shadow-md text-left hover:bg-blue-700 transition group"
            >
              <p className="text-sm opacity-80 mb-3">Admin Panel</p>
              <h3 className="text-xl font-bold">Control Panel</h3>
              <p className="text-xs opacity-60 mt-2 flex items-center gap-1">
                Go to admin <ArrowRight className="w-3 h-3" />
              </p>
            </button>
            <button
              onClick={() => navigate("/admin/users")}
              className="bg-purple-600 text-white p-6 rounded-xl shadow-md text-left hover:bg-purple-700 transition group"
            >
              <p className="text-sm opacity-80 mb-3">Users</p>
              <h3 className="text-xl font-bold">Manage Users</h3>
              <p className="text-xs opacity-60 mt-2 flex items-center gap-1">
                View all users <ArrowRight className="w-3 h-3" />
              </p>
            </button>
            <button
              onClick={() => navigate("/admin/add-car")}
              className="bg-emerald-600 text-white p-6 rounded-xl shadow-md text-left hover:bg-emerald-700 transition group"
            >
              <p className="text-sm opacity-80 mb-3">Inventory</p>
              <h3 className="text-xl font-bold">Add New Car</h3>
              <p className="text-xs opacity-60 mt-2 flex items-center gap-1">
                List a vehicle <ArrowRight className="w-3 h-3" />
              </p>
            </button>
          </>
        )}

        {/* Profile status — users only */}
        {!isAdmin && (
          <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm opacity-80">Profile Status</p>
              <BadgeCheck className="w-5 h-5 opacity-60" />
            </div>
            <h3 className="text-xl font-bold uppercase mt-2">Verified</h3>
            <p className="text-xs opacity-40 mt-2">Account in good standing</p>
          </div>
        )}
        
        
      </div>

      {/* USER ONLY: Recent favourites preview */}
      {!isAdmin && favourites.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Recently Saved</h2>
            <button
              onClick={() => navigate("/favourites")}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favourites.slice(0, 3).map((car) => (
              <button
                key={car._id}
                onClick={() => navigate(`/cars/${car._id}`)}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition text-left"
              >
                <img
                  src={car.imageUrl}
                  alt={car.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {car.title}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    KES {car.price?.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {car.year} · {car.transmission}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
