# Backend Documentation

## Overview
The backend of the Internship Management System is built using Node.js and Express.js. It provides APIs for managing internships, companies, users, and contact messages. MongoDB is used as the database, and Mongoose is used for object modeling.

---

## Folder Structure

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

## Models

### User Model
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
```

### Company Model
```javascript
const companySchema = new mongoose.Schema({
  name: String,
  profilePicture: String,
  description: String,
});
```

### Contact Model
```javascript
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
```

---

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `sample.env`.

4. Start the development server:
   ```bash
   npm start
   ```

---

## Notes
- Ensure MongoDB is running locally or provide a connection string in the `.env` file.
- Use Postman or similar tools to test the API endpoints.
- Follow the folder structure for adding new features or modules.
