import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, FileText, Loader2, PlusCircle, Trash2, Users } from 'lucide-react'; // Added Users icon
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const DashboardCompany = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/internships/company?search=${encodeURIComponent(search)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setInternships(response.data);
        setLoading(false);
      } catch (err) {
        alert('Failed to load internships');
        setLoading(false);
      }
    };


    fetchInternships();
  }, [search]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/internships/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInternships((prev) => prev.filter((internship) => internship._id !== id));
      toast('Internship deleted successfully')
    } catch (err) {
      toast('Failed to delete internship')
    }
  };

  
  // console.log(internships,"====")

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        <Briefcase className="inline-block mr-2 text-[#FFDAB3]" size={28} />
        Company Dashboard
      </h2>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Your Internships</h3>
        <Button
          onClick={() => navigate('/dashboard/company/new')}
          className=" text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Post New Internship
        </Button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600 flex gap-2">Loading internships... <Loader2/></p>
      ) : internships.length === 0 ? (
        <p className="text-center text-gray-600">No internships found. Start by posting a new one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship._id}
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-all bg-white flex flex-col justify-between"
            >
              <div>

               


                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                  <FileText className="inline-block mr-2 text-[#FFDAB3]" size={20} />
                  {internship.title}
                </h4>

                 


                <p className="text-sm text-gray-600 mb-4 mt-2">{internship.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Skills Required:</strong> {internship.skillsRequired.join(', ')}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                <strong>Stipend:</strong> {internship.stipend.type === 'Paid' ? `$${internship.stipend.amount}` : 'Free'}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Duration:</strong> {internship.duration}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {internship.location}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Mode:</strong> {internship.mode}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Openings:</strong> {internship.openings}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Deadline:</strong> {new Date(internship.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Joining Date:</strong> {new Date(internship.joinDate).toLocaleDateString()}
              </p>


              </div>
              <div className="flex flex-col mt-3  space-y-2">
                <button
                  onClick={() => handleDelete(internship._id)}
                  className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-700 transition flex items-center justify-center transform hover:scale-105"
                >
                  <Trash2 className="mr-2" size={18} />
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/dashboard/company/internship/${internship._id}/candidates`)}
                  className="bg-[#CCCCFF]  hover:bg-[#b2b2f0] text-white px-4 cursor-pointer py-2 rounded-lg transition flex items-center justify-center transform hover:scale-105"
                >
                  <Users className="mr-2" size={18} />
                  Candidate List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCompany;