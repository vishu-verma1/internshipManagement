# Internship Management Frontend Documentation

## Overview

The Internship Management frontend is a React-based application built with **Vite**. It provides a platform for students to apply for internships and companies to post internship opportunities. The application is designed to be responsive, user-friendly, and scalable.

---

## Project Structure

### **Folder Structure**

```plaintext
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

## Pages

### **Landing Page**

- **Path**: `/`
- **Description**: The homepage introduces the platform and provides navigation to key sections like "About Us," "Success Stories," and "Contact Us."
- **Key Features**:
  - Introduction section
  - "Why Choose Us" section
  - Success stories slider
  - Navigation to registration and login pages

### **Dashboard User**

- **Path**: `/dashboard/user`
- **Description**: Displays available internships for students.
- **Key Features**:
  - Internship details (title, description, skills, stipend, duration, etc.)
  - Apply button for internships
  - View company details button

### **Dashboard Company**

- **Path**: `/dashboard/company`
- **Description**: Allows companies to manage their internships.
- **Key Features**:
  - Post new internships
  - View and delete existing internships
  - Candidate list for each internship

### **Profile**

- **Path**: `/profile`
- **Description**: Allows users to manage their profile information.
- **Key Features**:
  - Edit profile details (name, email, phone, education, experience, etc.)
  - View uploaded resume
  - Update company details for company users

### **Contact Us**

- **Path**: `/contact-us`
- **Description**: Provides a form for users to submit messages or inquiries.
- **Key Features**:
  - Responsive form for name, email, and message
  - Backend integration for message submission

### **Success Stories**

- **Path**: `/success-stories`
- **Description**: Displays success stories of students and companies using the platform.
- **Key Features**:
  - List of stories with images and descriptions

### **Internship Form**

- **Path**: `/dashboard/company/new`
- **Description**: Allows companies to post new internships.
- **Key Features**:
  - Form for internship details (title, description, skills, stipend, duration, etc.)
  - Backend integration for posting internships

---

## Components

### **Header**

- Provides navigation links to key pages like Dashboard, Profile, and Contact Us.

### **Footer**

- Displays links to terms of service, privacy policy, and contact information.

### **Button**

- Reusable button component with customizable styles.

---

## API Integration

### **Environment Variables**

- **File**: `.env`
- **Variables**:
  - `VITE_API_URL`: Base URL for the backend API.

### **API Endpoints**

- **Internships**:
  - `GET /api/internships`: Fetch available internships.
  - `POST /api/internships`: Create a new internship.
- **Applications**:
  - `POST /api/applications/:id/apply`: Apply for an internship.
- **Contact**:
  - `POST /api/contact`: Submit a message.

---

## Static Assets

### **Images**

- **Path**: `public/images/`
- **Examples**:
  - `defaultprofile.png`: Default profile picture for users/companies.
  - `contact.png`: Image for the Contact Us page.
  - `internshipPost.jpg`: Image for the Internship Form page.

---

## Development

### **Prerequisites**

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

### **Installation & Running**

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

```bash
git clone <repository-url>
```

2. **Navigate to the frontend directory:**

```bash
cd frontend
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Build for production:**

```bash
npm run build
```

---

### **Environment Setup**

- Copy `.env` or create a new `.env` file based on `sample.env`.
- Set the `VITE_API_URL` variable to point to your backend API.

---

### **Linting & Formatting**

- To run ESLint and check for code issues:

  ```bash
  npm run lint
  ```

- To fix lint errors automatically:

  ```bash
  npm run lint:fix
  ```

---

### **Additional Notes**

- Make sure the backend API is running and accessible at the URL specified in your `.env` file.
- For any issues, refer to the [project issues](https://github.com/your-repo/issues) or contact the maintainer.

1. Clone the repository:

   ```bash
   git clone <repository-url>


   Navigate to the frontend directory:
   cd frontend
   Install dependencies:
   npm install
   Start the development server:
   npm run dev
   Build
   To create a production build:
   npm run build
   ```
