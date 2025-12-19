import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthLayout from '../../components/AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [toggle, seeToggle] = useState(false);
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await login(formData.email, formData.password);
      toast.success('Login successful!');

      // Check if there's a redirect location from state
      const from = location.state?.from;

      if (from) {
        navigate(from);
      } else {
        // Default redirect based on role
        const redirectPath = response.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
        navigate(redirectPath);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed. Please try again.';

      if (error.response?.status === 400) {
        toast.error('Invalid email or password');
      } else if (error.response?.status === 401) {
        toast.error('Unauthorized. Please check your credentials.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.code === 'ECONNREFUSED') {
        toast.error('Cannot connect to server. Please check your connection.');
      } else {
        toast.error(errorMessage);
      }

      console.error('Login error:', error);
    }
  };

  return (
    <AuthLayout>
    
        <h1 className="text-3xl font-bold mb-2 text-white ">Best Ideas Education</h1>
        <p className="text-white/70 mb-6">Micro-Learning LMS Platform</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-4 py-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={toggle ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <button
              type="button"
              onClick={() => seeToggle(!toggle)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
            >
              {toggle ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      
    </AuthLayout>
  );
};

export default Login;
