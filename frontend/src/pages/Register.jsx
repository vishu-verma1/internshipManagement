import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // New extra fields:
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // For users extra:
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');

  // For companies extra:
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === 'company'
          ? `${import.meta.env.VITE_API_URL}/api/auth/company/register`
          : `${import.meta.env.VITE_API_URL}/api/auth/register`;

      // Build payload based on role
      const payload = role === 'company'
        ? { name, email, password, role, phone, address, website, description }
        : { name, email, password, role, phone, education, experience, address };

      const { data } = await axios.post(endpoint, payload);
      setSuccess(data.message || 'Registration successful!');
      toast("Registration successful!");
      setError('');
      setTimeout(() => {
        navigate('/otp-verification', { state: { email, role } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      toast("Registration failed.");
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Form Section */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {role === 'company' ? 'Company' : 'User'} Registration
          </h2>
          <form onSubmit={handleRegister} className="space-y-2">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
            </div>
            {role === 'user' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border p-2 rounded-md" />
                </div>
              </>
            )}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button type="submit" className="w-full bg-[#292966] text-white cursor-pointer  py-2 rounded-md hover:bg-[#5C5C99] transition">
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span onClick={() => navigate(`/login/${role}`)} className="text-blue-600 hover:underline cursor-pointer">
              Login here
            </span>
          </p>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-white p-2 rounded-md">
          <h2 className="text-2xl font-semibold mt-2">BridgeCareer</h2>
          <div className="h-full w-full">
            <img className="object-cover h-full w-full rounded-r-lg" src="/images/register.jpg" alt="register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;