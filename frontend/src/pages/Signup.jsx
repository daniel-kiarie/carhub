import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ⚠️ Don't forget to import axios!
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be 6+ chars";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirm = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/auth/signup",
        "https://carhub-269k.onrender.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      alert("Signup Successful!");
      // window.location.href = "/admin/add-car";
      navigate("/login")
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response?.data?.message || error.message,
      );
      alert(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <div className="mb-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <input
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          {errors.confirm && (
            <p className="text-red-500 text-xs">{errors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}; // Component finally ends here

export default Signup;
