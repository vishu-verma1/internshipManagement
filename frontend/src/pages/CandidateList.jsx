import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CandidateList = () => {
    const { internshipId } = useParams();
    const [applications, setApplications] = useState([]);
    const [acceptedCandidates, setAcceptedCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("candidates"); // "candidates" or "shortlist"
    const navigate = useNavigate();

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/internship/${internshipId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setApplications(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching candidates:', err);
            setLoading(false);
        }
    };

    const fetchAcceptedCandidates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/internship/${internshipId}/accepted`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAcceptedCandidates(response.data);
        } catch (err) {
            console.error('Error fetching accepted candidates:', err);
        }
    };

    useEffect(() => {
        fetchCandidates();
        fetchAcceptedCandidates();
    }, [internshipId]);

    const updateStatus = async (applicationId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/applications/${applicationId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast(`Application ${status}`);
            fetchCandidates();
            fetchAcceptedCandidates();
        } catch (err) {
            toast(err.response?.data?.message || 'Failed to update status');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6 flex items-center justify-between">
                <Button onClick={() => navigate(-1)} className="text-white hover:bg-gray-600 cursor-pointer">
                    &larr; Back
                </Button>
                <h2 className="text-3xl font-bold text-center flex-grow text-gray-800">
                    Candidates for Internship
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setActiveTab("candidates")}
                    className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "candidates" ? "bg-gray-300" : "bg-gray-100"} text-gray-800`}
                >
                    Candidates
                </button>
                <button
                    onClick={() => setActiveTab("shortlist")}
                    className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "shortlist" ? "bg-gray-300" : "bg-gray-100"} text-gray-800`}
                >
                    Shortlist
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading candidates...</p>
            ) : activeTab === "candidates" ? (
                applications.length === 0 ? (
                    <p className="text-center text-gray-600">No candidates have applied for this internship.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {applications
                            .filter((app) => app.status === "pending") // Show only pending candidates
                            .map((app) => (
                                <Card key={app._id} className="flex flex-col justify-between bg-[#CCCCFF]">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/${app.userId.profilePicture}`}
                                                alt={app.userId.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <CardTitle>{app.userId.name}</CardTitle>
                                                <CardDescription>{app.userId.email}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-700">
                                            <strong>Skills:</strong> {app.userId.skills.join(', ')}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Phone:</strong> {app.userId.phone || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Education:</strong> {app.userId.education || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Experience:</strong> {app.userId.experience || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Address:</strong> {app.userId.address || "N/A"}
                                        </p>
                                        {app.userId.resumeUrl && (
                                            <a
                                                href={`${import.meta.env.VITE_API_URL}/${app.userId.resumeUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:underline mt-2"
                                            >
                                                <FileText className="mr-1" size={16} /> View Resume
                                            </a>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                        <div className="mt-4">
                                            <div className="mt-2 flex space-x-2">
                                                <button
                                                    onClick={() => updateStatus(app._id, "accepted")}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(app._id, "rejected")}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                )
            ) : (
                acceptedCandidates.length === 0 ? (
                    <p className="text-center text-gray-600">No candidates have been shortlisted for this internship.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {acceptedCandidates.map((app) => (
                            <Card key={app._id} className="flex flex-col justify-between bg-[#CCCCFF]">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/${app.userId.profilePicture}`}
                                            alt={app.userId.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <CardTitle>{app.userId.name}</CardTitle>
                                            <CardDescription>{app.userId.email}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm mb-2 text-gray-700">
                                        <strong>Skills:</strong> {app.userId.skills.join(', ')}
                                    </p>
                                    <p className="text-sm mb-2 text-gray-700">
                                        <strong>Phone:</strong> {app.userId.phone || "N/A"}
                                    </p>
                                    <p className="text-sm mb-2 text-gray-700">
                                        <strong>Education:</strong> {app.userId.education || "N/A"}
                                    </p>
                                    <p className="text-sm mb-2 text-gray-700">
                                        <strong>Experience:</strong> {app.userId.experience || "N/A"}
                                    </p>
                                    <p className="text-sm mb-2 text-gray-700">
                                        <strong>Address:</strong> {app.userId.address || "N/A"}
                                    </p>
                                    {app.userId.resumeUrl && (
                                        <a
                                            href={`${import.meta.env.VITE_API_URL}/${app.userId.resumeUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-600 hover:underline mt-2"
                                        >
                                            <FileText className="mr-1" size={16} /> View Resume
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default CandidateList;