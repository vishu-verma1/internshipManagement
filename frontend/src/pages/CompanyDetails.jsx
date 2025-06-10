import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Globe, FileText, Users, Briefcase, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CompanyDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const companyId = state?.companyId;
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }
        const fetchCompany = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/companies/${companyId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCompany(response.data);
            } catch (error) {
                console.error("Failed to fetch company details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [companyId]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!company) {
        return <p className="text-center mt-10">No company details available.</p>;
    }

    return (
        <div className="p-5 w-full">
            <Button onClick={() => navigate(-1)} className="mb-3 text-white hover:bg-gray-800 cursor-pointer">
                &larr; Back
            </Button>

            <h2 className="text-3xl font-bold mb-8 text-center">Company Details</h2>

            <div className="border rounded-lg p-6 shadow w-1/2 flex flex-col justify-center mx-auto">
                {/* Company Profile Picture */}
                {company.profilePicture && (

                    <div className='flex gap-3 justify-center'>
                        <div className=" mb-6">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${company.profilePicture}`}
                                alt={company.name}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <span className="text-xl font-semibold">{company.name}</span>
                        </div>
                    </div>

                )}

                {/* Basic Details */}

                <div className="flex items-center mb-4">
                    <Mail className="mr-2" size={20} />
                    <span>{company.email}</span>
                </div>

                {company.description && (
                    <div className="flex items-center mb-4">
                        <FileText className="mr-2" size={20} />
                        <p>{company.description}</p>
                    </div>
                )}

                
                {company.phone && (
                    <div className="flex items-center mb-4">
                        <Phone className="mr-2" size={20} />
                        <span>{company.phone}</span>
                    </div>
                )}
                {company.address && (
                    <div className="flex items-center mb-4">
                        <MapPin className="mr-2" size={20} />
                        <span>{company.address}</span>
                    </div>
                )}
                {company.website && (
                    <div className="flex items-center mb-4">
                        <Globe className="mr-2" size={20} />
                        <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            {company.website}
                        </a>
                    </div>
                )}
                

                {/* Additional Details */}
                {company.linkedin && (
                    <div className="flex items-center mb-4">
                        <Globe className="mr-2" size={20} />
                        <a href={company.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn
                        </a>
                    </div>
                )}
                {company.instagram && (
                    <div className="flex items-center mb-4">
                        <Globe className="mr-2" size={20} />
                        <a href={company.instagram} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            Instagram
                        </a>
                    </div>
                )}
                {company.facebook && (
                    <div className="flex items-center mb-4">
                        <Globe className="mr-2" size={20} />
                        <a href={company.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            Facebook
                        </a>
                    </div>
                )}
                {company.industry && (
                    <div className="flex items-center mb-4">
                        <Briefcase className="mr-2" size={20} />
                        <span>{company.industry}</span>
                    </div>
                )}
                {company.companyType && (
                    <div className="flex items-center mb-4">
                        <Building className="mr-2" size={20} />
                        <span>{company.companyType}</span>
                    </div>
                )}
                {company.numberOfEmployees && (
                    <div className="flex items-center mb-4">
                        <Users className="mr-2" size={20} />
                        <span>{company.numberOfEmployees} Employees</span>
                    </div>
                )}
                {company.headOfficeAddress && (
                    <div className="flex items-center mb-4">
                        <MapPin className="mr-2" size={20} />
                        <span>{company.headOfficeAddress}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyDetails;