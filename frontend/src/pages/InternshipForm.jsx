import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Loader, Save } from 'lucide-react'; // Import Lucide React icons
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const InternshipForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [stipendAmount, setStipendAmount] = useState(0);
  const [stipendType, setStipendType] = useState('Free');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('Online');
  const [openings, setOpenings] = useState(1);
  const [deadline, setDeadline] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/internships`,
        {
          title,
          description,
          skillsRequired: skillsRequired.split(',').map((skill) => skill.trim()),
          stipend: { amount: stipendAmount, type: stipendType },
          duration,
          location,
          mode,
          openings,
          deadline,
          joinDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // alert();
      toast('Internship posted successfully!')
      navigate('/dashboard/company'); // Redirect to the dashboard after posting
    } catch (err) {
      // alert('');
      toast('Failed to post internship')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-5 px-3 w-full items-center">
      <h2 className="text-3xl font-bold  mb-8 text-center text-gray-800">
        <FileText className="inline-block mr-2 text-[#FFDAB3]" size={28} />
        Post a New Internship
      </h2>


      <div className='flex bg-white w-[65vw] rounded-lg border shadow-lg'>

        <form onSubmit={handleSubmit} className=" w-full p-6  space-y-6 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internship Title</label>
            <input
              type="text"
              className="w-full p-2  border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" >Description</label>
            <textarea
              className="w-full p-2 border rounded-lg resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stipend Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={stipendAmount}
                onChange={(e) => setStipendAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stipend Type</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={stipendType}
                onChange={(e) => setStipendType(e.target.value)}
              >
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
            </div>
          </div>

          <div className='flex gap-2 w-full'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg "
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Openings</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className={`w-full bg-[#CCCCFF] text-white py-3 rounded-lg cursor-pointer hover:bg-[#5C5C99] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={loading}
          >
            <Save className="mr-1" size={20} />
            {loading ? <Loader className='animate-spin' /> : 'Post Internship'}
          </Button>
        </form>



        {/* image section */}
        <div className='w-full rounded-lg  p-2 py-8'>
          <img className='object-cover object-center' src="/images/internshipPost.jpg" alt="" />

          <div className='w-full flex flex-col text-center mt-8 '>
            <h5 className='text-2xl font-bold mb-3 text-[#574964] '> We Got Your Back </h5>
            <p className='text-[#292966]'>Interns are like not-cut diamonds. They have flaws, some of them are totally worthless, but once you cut them well, they can become something great one day, And that’s what I’m doing, I’m cutting diamonds…</p>
          </div>
        </div>

      </div>




    </div>
  );
};

export default InternshipForm;