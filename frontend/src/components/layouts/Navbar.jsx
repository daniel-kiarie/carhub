import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const toggleMenu = () => setOpen(!open);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight hover:text-blue-400 transition"
        >
          CAR<span className="text-blue-500">HUB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/cars" className="hover:text-blue-400">
            Cars
          </Link>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>

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

          {user && user.role === "user" && (
            <>
              <Link to="/favourites" className="hover:text-blue-400">
                Favourites
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
            </>
          )}

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

          {user && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 border border-red-400 px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-slate-800 p-4 rounded-lg">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/cars" onClick={closeMenu}>
            Cars
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          {!user && (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                Signup
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link to="/favourites" onClick={closeMenu}>
                Favourites
              </Link>
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </>
          )}

          {user && (user.role === "admin" || user.isAdmin) && (
            <>
              <Link to="/admin" onClick={closeMenu}>
                Admin
              </Link>
              <Link to="/admin/users" onClick={closeMenu}>
                Manage Users
              </Link>
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-red-400 border border-red-400 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
