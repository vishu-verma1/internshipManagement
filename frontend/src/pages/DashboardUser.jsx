import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, CheckCircle, Info } from 'lucide-react'; // Import icons from Lucide React
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DashboardUser = () => {
  const [internships, setInternships] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState(new Set()); // Store applied internship IDs
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();


  // console.log(internships[3]?.companyId._id,"\\\\\\\\\\") 

  useEffect(() => {
    const fetchInternshipsAndApplications = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch internships
        const internshipsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/internships/get?search=${encodeURIComponent(search)}`
        );
        setInternships(internshipsResponse.data);

        // Fetch user's applications
        const applicationsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract internship IDs from applications
        // console.log(applicationsResponse.data,"8888")
        const appliedIds = new Set(applicationsResponse.data.map((app) => app.internshipId?._id));
        // console.log(appliedIds,"8888")

        setAppliedInternships(appliedIds);
      } catch (err) {
        console.log(err, "error in dashborUser")
        toast('Failed to load internships or applications');
      }
    };

    fetchInternshipsAndApplications();
  }, [search]);

  console.log(internships, "====")

  const apply = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications/${id}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Add the applied internship ID to the state
      toast('Internship has been applied ');
      setAppliedInternships((prev) => new Set(prev).add(id));
    } catch (err) {
      toast('you have allready applied');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        <Briefcase className="inline-block mr-2 text-[#FFDAB3]" size={28} />
        Available Internships
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {internships.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-6 shadow-md hover:scale-105 transition-all flex flex-col justify-between bg-white"
          >
            <div>

              {/* Company Details */}
              <div className="flex items-center mb-5 ">
                <img
                  src={
                    job.companyId.profilePicture
                      ? `${import.meta.env.VITE_API_URL}/${job.companyId.profilePicture}`
                      : '/images/defaultprofile.png' // Path to your default image
                  }
                  alt={job.companyId.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <h4 className="text-lg font-semibold text-gray-800">{job.companyId.name}</h4>
              </div>


              <h3 className="text-xl font-semibold mb-2 text-gray-800 flex items-center">
                <Info className="mr-2 text-blue-500" size={20} />
                {job.title}
              </h3>


              {/* Internship Details */}

              <p className="text-sm text-gray-600 mb-4">{job.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Skills:</strong> {job.skillsRequired.join(', ')}
              </p>

              <p className="text-sm text-gray-500">
                <strong>Stipend:</strong> {job.stipend.type === 'Paid' ? `$${job.stipend.amount}` : 'Free'}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Duration:</strong> {job.duration}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Mode:</strong> {job.mode}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Openings:</strong> {job.openings}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Joining Date:</strong> {new Date(job.joinDate).toLocaleDateString()}
              </p>

            </div>

            <div className="flex flex-col gap-3 mt-5">
              <button
                className={`p-2 rounded-lg font-medium flex cursor-pointer items-center justify-center ${appliedInternships.has(job._id)
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-[#CCCCFF] text-white hover:bg-[#b2b2f0]'
                  }`}
                onClick={() => apply(job._id)}
                disabled={appliedInternships.has(job._id)}
              >
                {appliedInternships.has(job._id) ? (
                  <>
                    <CheckCircle className="mr-2" size={18} />
                    Applied
                  </>
                ) : (
                  'Apply'
                )}
              </button>
              <Button
                className="p-2 rounded-lg font-medium  cursor-pointer text-white hover:bg-gray-800 transition flex items-center justify-center"
                onClick={() =>
                  navigate("/company-details", { state: { companyId: job.companyId._id } })
                }
              >
                View Company
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;