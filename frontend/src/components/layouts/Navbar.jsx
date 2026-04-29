import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirecting to Home ('/') instead of '/login'
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-400 transition"
        >
          CAR<span className="text-blue-500">HUB</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/cars" className="hover:text-blue-400">
            Cars
          </Link>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>

          {/* GUEST LINKS */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          )}

          {/* LOGGED IN USER LINKS (Non-Admin) */}
          {user && user.role === "user" && (
            <>
              {/* Note: Standardized to 'favourites' to match your backend mounting */}
              <Link to="/favourites" className="hover:text-blue-400">
                Favourites
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {user && (user.role === "admin" || user.isAdmin) && (
            <>
              <Link to="/admin" className="hover:text-blue-400">
                Admin
              </Link>
              <Link to="/admin/users" className="hover:text-blue-400">
                Manage Users
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
            </>
          )}

          {/* LOGOUT BUTTON */}
          {user && (
            <div className="flex items-center gap-4">
              
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 border border-red-400 px-3 py-1 rounded-md transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;