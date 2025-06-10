import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud } from 'lucide-react'; // Import Lucide React icon
import { Button } from '@/components/ui/button';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage('Invalid file type. Only PDF and DOC/DOCX files are allowed.');
        setFile(null);
      } else {
        setErrorMessage('');
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/resume/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message || 'Resume uploaded and analyzed successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className=" w-full p-20 flex justify-center items-center ">

      <div className=' main shadow-md border flex w-3/4 max-w-4xl rounded-lg  '>
        <div className='left w-1/2 p-3 ' >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            <UploadCloud className="inline-block mr-2 text-blue-600" size={28} />
            Upload Your Resume
          </h2>

          <p className="text-gray-600 mb-4 text-center">
            Upload your resume in PDF, DOC, or DOCX format to analyze and apply for internships.
          </p>

          <div className="flex flex-col items-center ">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mb-4 h-[30vh] bg-gray-100 p-2 rounded cursor-pointer w-full"
            />
            {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
            <Button
              onClick={handleUpload}
              className="bg-blue-600 cursor-pointer mt-5 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <UploadCloud className="mr-2" size={20} />
              Upload Resume
            </Button>
            {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
          </div>
        </div>

        <div className=' right p-3 w-1/2 h-[60vh] bg-[url("/images/internship.png")] bg-cover bg-center'></div>
      </div>

    </div>
  );
};

export default ResumeUpload;