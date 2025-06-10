// import React from 'react';
// import { Twitter, Facebook, Instagram } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-200 text-gray-900 py-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Terms of Service */}
//         <div>
//           <h3 className="font-bold text-lg ">Terms of Service</h3>
//           <ul className="text-sm space-y-1">
//             <li><strong>Description:</strong> Overview of the platform.</li>
//             <li><strong>User Eligibility:</strong> Students must be of legal age; companies must be legitimate.</li>
//             <li><strong>User Responsibilities:</strong> Provide accurate information, communicate respectfully, and avoid spamming.</li>
//             <li><strong>Posting Rules for Companies:</strong> Must adhere to posting guidelines.</li>
//             <li><strong>Application Rules for Students:</strong> Follow application procedures as required.</li>
//             <li><strong>Platform Rights:</strong> Right to modify, suspend, or remove content.</li>
//             <li><strong>Limitation of Liability:</strong> Liability is limited as specified.</li>
//             <li><strong>Termination of Accounts:</strong> Accounts may be terminated for violations.</li>
//             <li><strong>Dispute Resolution:</strong> Disputes will be resolved per our guidelines.</li>
//             <li>
//               <strong>Legal Queries Contact:</strong> legal@bridgecareer.com
//             </li>
//           </ul>
//         </div>

//         {/* Privacy Policy */}
//         <div>
//           <h3 className="font-bold text-lg ">Privacy Policy</h3>
//           <ul className="text-sm space-y-1">
//             <li><strong>Information Collected:</strong> Name, email, resume, company info, etc.</li>
//             <li><strong>Data Usage:</strong> For matching, communication, and analytics.</li>
//             <li>
//               <strong>Third-Party Services:</strong> Information is shared with email providers, analytics, etc.
//             </li>
//             <li>
//               <strong>Data Storage & Security:</strong> User data is stored securely.
//             </li>
//             <li>
//               <strong>User Rights:</strong> Users can access, update, or delete their account.
//             </li>
//             <li>
//               <strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies.
//             </li>
//             <li>
//               <strong>Data Retention:</strong> Data is retained as per our policy.
//             </li>
//             <li>
//               <strong>Privacy Queries:</strong> privacy@bridgecareer.com
//             </li>
//           </ul>
//         </div>

//         {/* About Us & Contact */}
//         <div>
//           <h3 className="font-bold text-lg ">About Us</h3>
//           <p className="text-sm mb-4">
//             BridgeCareer is a platform dedicated to connecting talented individuals with companies offering internships.
//           </p>
//           <h3 className="font-bold text-lg mb-2">Contact Us</h3>
//           <p className="text-sm mb-2">
//             Email: support@bridgecareer.com
//           </p>
//           <div className="flex gap-4">
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Twitter"
//             >
//               <Twitter size={24} className="text-blue-500" />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//             >
//               <Facebook size={24} className="text-blue-600" />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//             >
//               <Instagram size={24} className="text-pink-500" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-2 text-center text-xs text-gray-600">
//         © {new Date().getFullYear()} BridgeCareer. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2f2f2f] text-white py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-2">
            <p>About Us</p>
            <p>We’re hiring</p>
            <p>Hire interns for your company</p>
            <p>Post a Job</p>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <p>Team Diary</p>
            <p>Blog</p>
            <p>Our Services</p>
            <p>Free Job Alerts</p>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <p>Terms & Conditions</p>
            <p>Privacy</p>
            <p>Contact us</p>
            <p>Resume Maker</p>
          </div>

          {/* Column 4 */}
          <div className="space-y-2">
            <p>Sitemap</p>
            <p>College TPO registration</p>
            <p>List of Companies</p>
            <p>Jobs for Women</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* App Store Badges */}
          <div className="flex space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 items-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-white hover:text-pink-500" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="text-white hover:text-blue-400" size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="text-white hover:text-blue-600" size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()} BridgeCareer (Scholiverse Educare Private Limited)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
