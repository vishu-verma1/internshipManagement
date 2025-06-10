const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/dbConnection");
connectDB();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Ensure the uploads/profile-pictures directory exists
const profilePicturesDir = path.join(__dirname, "uploads/profile-pictures");
if (!fs.existsSync(profilePicturesDir)) {
  fs.mkdirSync(profilePicturesDir, { recursive: true });
  console.log("Created directory: uploads/profile-pictures");
}

const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const applicationRoutes = require('./routes/aplicationRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const companyRoutes = require('./routes/companyRoute');
const contactRoutes = require('./routes/contactRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());




// app.use("/user", userRoute);


// app.use('/api/resume', require('./routes/resumeRoutes'));
// app.use('/uploads', express.static('uploads')); // Allow access to uploaded resumes
// app.use('/api/auth', require('./routes/authRoutes'));


app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contact', contactRoutes);


app.listen(3000, () => {
  console.log(`Server is Running on Port ${3000}`);
});
