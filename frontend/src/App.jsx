import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardCompany from './pages/DashboardCompany';
import Header from './components/Header';
import Footer from './components/Footer';
import ResumeUpload from './pages/ResumeUpload';
import Notifications from './pages/Notifications';
import OtpVerification from './pages/Otp';
import Profile from './pages/Profile';
import InternshipForm from './pages/InternshipForm';
import CandidateList from './pages/CandidateList';
import TrackApplication from './pages/TrackApplication';
import CompanyDetails from './pages/CompanyDetails';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import SuccessStories from './pages/SuccessStories';
import AboutUs from './pages/AboutUs';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login/user" />;
};

const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/otp-verification';
    // location.pathname.startsWith('/register') ||
    // location.pathname === '/'  ||
    // location.pathname.startsWith('/login') ||
    

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!hideHeaderFooter && <Header />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Navigate to="/login/user" />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login/:role" element={<LoginWrapper />} />
            <Route path="/register/:role" element={<RegisterWrapper />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/dashboard/user" element={<ProtectedRoute><DashboardUser /></ProtectedRoute>} />
            <Route path="/dashboard/company" element={<ProtectedRoute><DashboardCompany /></ProtectedRoute>} />
            <Route path="/track-application" element={<ProtectedRoute><TrackApplication /></ProtectedRoute>} />
            <Route path="/upload-resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/company/new" element={<ProtectedRoute><InternshipForm /></ProtectedRoute>} />
            <Route
              path="/dashboard/company/internship/:internshipId/candidates"
              element={<ProtectedRoute><CandidateList /></ProtectedRoute>}
            />
            <Route path="/company-details" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
};

const LoginWrapper = () => {
  const { role } = useParams();
  return <Login role={role} />;
};

const RegisterWrapper = () => {
  const { role } = useParams();
  return <Register role={role} />;
};

export default App;