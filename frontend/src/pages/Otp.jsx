import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Retrieve email, role, and context (registration or email update) from state
  const { email, role, isEmailUpdate } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the endpoint based on whether it's an email update or registration
      const endpoint = isEmailUpdate
        ? `${import.meta.env.VITE_API_URL}/api/auth/verify-updated-email`
        : role === 'company'
        ? `${import.meta.env.VITE_API_URL}/api/auth/company/verify-otp`
        : `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`;

      const response = await axios.post(endpoint, { email, otp });

      if (isEmailUpdate) {
        // For email updates, just show a success message and redirect to the profile page
        alert('Email verified successfully!');
        navigate('/profile');
      } else {
        // For registration, save token, role, and user in context and localStorage
        const { token, user } = response.data;
        login(token, role, user);

        setSuccess(response.data.message);
        setError('');

        // Redirect to the appropriate dashboard based on role
        setTimeout(() => {
          if (role === 'company') {
            navigate('/dashboard/company');
          } else {
            navigate('/dashboard/user');
          }
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your email: <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;