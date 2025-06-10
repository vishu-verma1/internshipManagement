import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Info, Clock, XCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TrackApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // console.log(applications,"99999")

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-6">Track Your Applications</h2>
      <Button onClick={() => navigate(-1)} className="mb-3 text-white hover:bg-gray-800 cursor-pointer">
        &larr; Back
      </Button>

      {loading ? (
        <p className="text-center text-gray-600 flex gap-2">Loading applications... <Loader2 /> </p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600">You have not applied to any internships yet.</p>
      ) : (
        <div className="gap-5 mt-5 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <Card key={app._id} className="bg-[#A3A3CC]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${app.internshipId?.companyId?.profilePicture}`}
                    alt={app.internshipId?.companyId?.name || 'Company'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {app.internshipId?.companyId?.name || 'Company Name'}
                  </h4>
                </div>
                <CardTitle>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {app.internshipId?.title || 'Internship Title'}
                  </h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm text-gray-700 ">
                    <strong>Description:</strong> {app.internshipId?.description || 'N/A'}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Skills Required:</strong> {app.internshipId?.skillsRequired.join(', ') || 'N/A'}
                </p>

                <div className='mb-1 flex gap-2'>
                  <p className="text-sm text-gray-700">
                    <strong>Stipend:</strong> {app.internshipId?.stipend?.type === 'Paid' ? `$${app.internshipId?.stipend?.amount}` : 'Free'}
                  </p>
                  <p className="text-sm text-gray-700 ">
                    <strong>Duration:</strong> {app.internshipId?.duration || 'N/A'}
                  </p>
                </div>

                <div className='mb-1 flex gap-2'>
                  <p className="text-sm text-gray-700 ">
                    <strong>Location:</strong> {app.internshipId?.location || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700 ">
                    <strong>Mode:</strong> {app.internshipId?.mode || 'N/A'}
                  </p>
                </div>

                <div className='mb-1 flex gap-2'>
                    <p className="text-sm text-gray-700 ">
                  <strong>Openings:</strong> {app.internshipId?.openings || 'N/A'}
                </p>
                <p className="text-sm text-gray-700 ">
                  <strong>Deadline:</strong> {app.internshipId?.deadline ? new Date(app.internshipId.deadline).toLocaleDateString() : 'N/A'}
                </p>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Joining Date:</strong> {app.internshipId?.joinDate ? new Date(app.internshipId.joinDate).toLocaleDateString() : 'N/A'}
                </p>
              </CardContent>
              <CardFooter>
                <div className="mt-2 flex items-center">
                  <p className="text-sm mr-2">
                    <strong>Status:</strong> {app.status}
                  </p>
                  {app.status === "accepted" && (
                    <CheckCircle className="text-green-600" size={18} />
                  )}
                  {app.status === "rejected" && (
                    <XCircle className="text-red-600" size={18} />
                  )}
                  {app.status === "pending" && (
                    <Clock className="text-yellow-600" size={18} />
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackApplication;