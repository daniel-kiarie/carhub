import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/public/Home"));
const Cars = lazy(() => import("../pages/public/Cars"));
const CarDetails = lazy(() => import("../pages/public/CarDetails"));
const Login = lazy(() => import("../pages/public/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Dashboard = lazy(() => import("../pages/user/Dashboard"));
const Favourites = lazy(() => import("../pages/user/Favourites"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AddCar = lazy(() => import("../pages/admin/AddCar"));
const About = lazy(() => import("../pages/public/About"));
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers"));

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

      {/* Protected — logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>

      {/* Protected — admin only */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-car" element={<AddCar />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
