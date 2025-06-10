import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Briefcase, Edit3, Save, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    website: '',
    description: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    industry: '',
    companyType: '',
    numberOfEmployees: '',
    headOfficeAddress: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        if (response.data.role === "user") {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone || '',
            address: response.data.address || '',
            education: response.data.education || '',
            experience: response.data.experience || '',
          });
        } else if (response.data.role === "company") {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone || '',
            address: response.data.address || '',
            website: response.data.website || '',
            description: response.data.description || '',
            linkedin: response.data.linkedin || '',
            instagram: response.data.instagram || '',
            facebook: response.data.facebook || '',
            industry: response.data.industry || '',
            companyType: response.data.companyType || '',
            numberOfEmployees: response.data.numberOfEmployees || '',
            headOfficeAddress: response.data.headOfficeAddress || '',
          });
        }
      } catch (err) {
        toast("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/upload-profile-picture`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      setProfile({ ...profile, profilePicture: response.data.profilePicture });
      toast('Profile picture updated successfully!');
    } catch (err) {
      toast('Failed to upload profile picture');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.emailVerificationRequired) {
        toast('Email updated. Please verify your new email.');
        navigate('/otp-verification', { state: { email: formData.email, role: profile.role, isEmailUpdate: true } });
      } else {
        setProfile(response.data);
        setIsEditing(false);
        toast('Profile updated successfully!');
      }
    } catch (err) {
      console.log(err,"0000")
      toast('Failed to update profile');
    }
  };




  if (!profile) {
    return <p className="text-center mt-10 text-gray-600 flex gap-2">Loading profile... <Loader2 /></p>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className=" w-[70vw] mb-5 mt-3 p-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          <User className="inline-block mr-2 text-[#FFDAB3]" size={28} />
          Profile
        </h2>

        <div className='flex w-full gap-3'>
          <Card className={'w-full'}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <User className="mr-2 text-gray-600" size={20} />
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border p-2 rounded w-full ml-2" />
                  ) : (
                    <p className="text-gray-800"><strong>Name</strong> {profile.name}</p>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>

              <div className='flex w-full gap-3'>
                <div className="flex items-center mb-2 w-full" >
                  <Mail className="mr-2 text-gray-600" size={20} />
                  {isEditing ? (
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border p-2 rounded w-full ml-2" />
                  ) : (
                    <p className="text-gray-800"><strong>Email</strong> {profile.email}</p>
                  )}
                </div>

                <div className="flex items-center mb-2 w-full">
                  <p className="text-gray-800 mr-2"><strong>Phone</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border p-2 rounded w-full ml-2"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.phone || 'N/A'}</p>
                  )}
                </div>

              </div>

              <div className='flex gap-3'>
                <div className="flex items-center mb-2 w-full">
                  <p className="text-gray-800 mr-2"><strong>Password</strong></p>
                  {isEditing ? (
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="New Password"
                      className="border p-2 rounded w-full ml-2"
                    />
                  ) : (
                    <p className="text-gray-600 italic">********</p>
                  )}
                </div>

                <div className="flex items-center mb-2 w-full">
                  <p className="text-gray-800 mr-2"><strong>Confirm Password </strong></p>
                  {isEditing ? (
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-600 italic">********</p>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-2">
                <p className="text-gray-800 mr-2"><strong>Address</strong></p>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full resize-none ml-2"
                  />
                ) : (
                  <p className="text-gray-800">{profile.address || 'N/A'}</p>
                )}
              </div>



              {profile.role === "user" && (
                <>
                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Education</strong></p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.education || 'N/A'}</p>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Experience</strong></p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.experience || 'N/A'}</p>
                    )}
                  </div>
                </>
              )}

              {profile.role === "company" && (
                <>
                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Website</strong></p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.website || 'N/A'}</p>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Description</strong></p>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2 resize-none"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.description || 'N/A'}</p>
                    )}
                  </div>

                  <div className='w-full flex gap-3'>
                    <div className="flex items-center mb-2 w-full">
                      <p className="text-gray-800 mr-2"><strong>LinkedIn</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full ml-2"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.linkedin || 'N/A'}</p>
                      )}
                    </div>

                    <div className="flex items-center mb-2 w-full">
                      <p className="text-gray-800 mr-2"><strong>Instagram</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full ml-2"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.instagram || 'N/A'}</p>
                      )}
                    </div>
                  </div>

                  <div className='w-full flex gap-3'>
                    <div className="flex items-center mb-2 w-full">
                      <p className="text-gray-800 mr-2"><strong>Facebook</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full ml-2"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.facebook || 'N/A'}</p>
                      )}
                    </div>

                    <div className="flex items-center mb-2 w-full">
                      <p className="text-gray-800 mr-2"><strong>Industry</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full ml-2"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.industry || 'N/A'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Company Type</strong></p>
                    {isEditing ? (
                      <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      >
                        <option value="Startup">Startup</option>
                        <option value="MNC">MNC</option>
                        <option value="NGO">NGO</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-800">{profile.companyType || 'N/A'}</p>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Number of Employees</strong></p>
                    {isEditing ? (
                      <input
                        type="number"
                        name="numberOfEmployees"
                        value={formData.numberOfEmployees}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.numberOfEmployees || 'N/A'}</p>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2"><strong>Head Office Address</strong></p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="headOfficeAddress"
                        value={formData.headOfficeAddress}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full ml-2"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.headOfficeAddress || 'N/A'}</p>
                    )}
                  </div>
                </>
              )}



              {profile.resumeUrl && (
                <div className="flex items-center mt-4">
                  <FileText className="mr-2 text-gray-600" size={20} />
                  <a href={`${import.meta.env.VITE_API_URL}/${profile.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View or Download Resume
                  </a>
                </div>
              )}



            </CardContent>
            <CardFooter>
              <div className="mt-6 text-center">
                {isEditing ? (
                  <button onClick={handleSave} className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center">
                    <Save className="mr-2" size={20} />
                    Save Changes
                  </button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="bg-[#5C5C99] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#292966] transition flex items-center justify-center">
                    <Edit3 className="mr-2" size={20} />
                    Edit Profile
                  </button>
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="img w-[20vw] border p-4 shadow-md rounded-md flex flex-col items-center py-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                className="object-cover w-full h-full"
                src={profile.profilePicture ? `${import.meta.env.VITE_API_URL}/${profile.profilePicture}` : '/images/defaultprofile.png'}
                alt="profile"
              />
              <label
                htmlFor="profilePictureInput"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </label>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </div>
            <h5 className="text-lg font-semibold mt-5 text-gray-800">Profile Picture</h5>
            <Button
              onClick={() => document.getElementById('profilePictureInput').click()}
              className="bg-[#5C5C99] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-[#292966]  transition mt-10"
            >
              Upload Picture
            </Button>
          </div>
        </div>




      </div>
    </div>
  );
};

export default Profile;