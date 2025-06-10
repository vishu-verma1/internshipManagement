import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
 
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // console.log('Role:', role);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === 'company'
          ? `${import.meta.env.VITE_API_URL}/api/auth/company/login`
          : `${import.meta.env.VITE_API_URL}/api/auth/login`;

      const { data } = await axios.post(endpoint, { email, password });
      login(data.token, role, data.user); // Pass user object to context

      toast(`${role === 'company' ? 'Company' : 'User'}`,
        { description: "logged in successfully!" }
      )


      // Redirect based on role
      if (role === 'company') {
        navigate('/dashboard/company');
      } else {
        navigate('/dashboard/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      toast("invalid Email and Password")

    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Form Section */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {role === 'company' ? 'Company' : 'User'} Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#292966] text-white py-2 rounded-md hover:bg-[#5C5C99] transition"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            {role === 'company' ? (
              <>
                <p className="text-sm text-gray-600">
                  Want to login as a user?{' '}
                  <Link to="/login/user" className="text-blue-600 hover:underline">
                    User Login
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Don't have an account?{' '}
                  <Link to="/register/company" className="text-blue-600 hover:underline">
                    Register as Company
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">
                  Want to login as a company?{' '}
                  <Link to="/login/company" className="text-blue-600 hover:underline">
                    Company Login
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Don't have an account?{' '}
                  <Link to="/register/user" className="text-blue-600 hover:underline">
                    Register as User
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Image Section */}

        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-white p-2 rounded-md">
          <h2 className="text-2xl font-semibold mt-2">BridgeCareer</h2>
          <div className="h-full w-full">
            <img
              className="object-cover h-full w-full rounded-r-lg"
              src="/images/login.png"
              alt="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;