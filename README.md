# Internship Management System Documentation

## Overview
The Internship Management System is a platform designed to connect students with companies offering internships. It consists of a React-based frontend and a Node.js/Express.js backend, with MongoDB as the database. The system is scalable, responsive, and user-friendly.

---

## Project Structure

### **Backend Folder Structure**

```
backend/
├── app.js                # Entry point of the application
├── package.json          # Project dependencies and scripts
├── README.md             # Backend documentation
├── sample.env            # Environment variable sample file
├── config/               # Configuration files
│   └── dbConnection.js   # Database connection setup
├── controllers/          # API controllers
│   ├── applicationController.js
│   ├── authController.js
│   ├── companyController.js
│   ├── contactController.js
│   ├── internshipController.js
│   └── resumeController.js
├── middleware/           # Middleware functions
│   ├── authMiddleware.js
│   ├── multer.js
│   └── uploadMiddleware.js
├── models/               # Mongoose models
│   ├── applicationModel.js
│   ├── companyModel.js
│   ├── contactModel.js
│   ├── internshipModel.js
│   ├── otpverificationModel.js
│   └── userModel.js
├── routes/               # API routes
│   ├── applicationRoutes.js
│   ├── authRoutes.js
│   ├── companyRoute.js
│   ├── contactRoutes.js
│   ├── internshipRoutes.js
│   └── resumeRoutes.js
├── services/             # Service layer
│   ├── authService.js
│   ├── notificationService.js
│   ├── otpService.js
│   └── resumeService.js
├── uploads/              # Uploaded files
│   ├── profile-pictures/ # Profile pictures
│   └── ...               # Other uploaded files
├── utils/                # Utility functions
│   ├── sendEmail.js
│   └── skillExtractor.js
```

### **Frontend Folder Structure**

```
frontend/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── components.json       # Component metadata
├── eslint.config.js      # ESLint configuration
├── index.html            # Entry point for the application
├── jsconfig.json         # JavaScript configuration
├── package.json          # Project dependencies
├── README.md             # Project documentation
├── sample.env            # Sample environment variables
├── vite.config.js        # Vite configuration
├── public/               # Static assets
│   ├── images/           # Images used in the application
│   └── vite.svg          # Vite logo
└── src/                  # Source code
  ├── App.jsx           # Main application component
  ├── index.css         # Global styles
  ├── main.jsx          # Application entry point
  ├── api/              # API utilities
  ├── assets/           # Static assets
  ├── components/       # Reusable components
  ├── context/          # Context providers
  ├── hooks/            # Custom hooks
  ├── lib/              # Utility libraries
  ├── pages/            # Application pages
  └── utils/            # Utility functions
```

---

## Features

### **Frontend Features**
- Responsive design for all pages.
- User dashboard for viewing internships.
- Company dashboard for managing internships.
- Contact Us page with backend integration.
- Success stories slider.

### **Backend Features**
- Authentication and authorization.
- CRUD operations for internships and companies.
- Contact message submission.
- Email notifications.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **POST** `/api/auth/verify-otp` - Verify OTP

### Companies
- **GET** `/api/companies` - Get all companies
- **POST** `/api/companies` - Add a new company
- **GET** `/api/companies/:id` - Get company details

### Internships
- **GET** `/api/internships` - Get all internships
- **POST** `/api/internships` - Add a new internship
- **GET** `/api/internships/:id` - Get internship details

### Contact
- **POST** `/api/contact` - Submit a contact message

---

## Development Setup

### **Backend Setup**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file based on `sample.env`.

5. Start the development server:
   ```bash
   npm start
   ```

### **Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Screenshots

### **Home Page**
![Home Page](frontend/screenShots/Home%20Page.png)

### **Company Dashboard**
![Company Dashboard](frontend/screenShots/Compay%20Dashboard.png)

### **Internship Post Form**
![Internship Post Form](frontend/screenShots/Intersghip%20Post%20Form.png)

### **Login Page**
![Login Page](frontend/screenShots/Login%20Page.png)

### **Register Page**
![Register Page](frontend/screenShots/Register%20Page.png)

### **Resume Upload Page**
![Resume Upload Page](frontend/screenShots/Resume%20Upload%20Page.png)

### **User Dashboard**
![User Dashboard](frontend/screenShots/User%20dashboard.png)

---

## Notes
- Ensure MongoDB is running locally or provide a connection string in the `.env` file.
- Make sure the backend API is running and accessible at the URL specified in your `.env` file.
- Use Postman or similar tools to test the API endpoints.
- Follow the folder structure for adding new features or modules.