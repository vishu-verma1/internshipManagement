const User = require("../models/userModel");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateOtp } = require("../services/otpService");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password, role, phone, education, experience, address } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 min

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      education,
      experience,
      address,
      otp,
      otpExpires,
    });
    await sendEmail(email, { subject: "VERIFICATION OTP" }, otp);
    await user.save();

    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerCompany = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    website,
    description,
    linkedin,
    instagram,
    facebook,
    industry,
    companyType,
    numberOfEmployees,
    headOfficeAddress,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    const existing = await Company.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Company already exists" });

    const company = new Company({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      website,
      description,
      linkedin,
      instagram,
      facebook,
      industry,
      companyType,
      numberOfEmployees,
      headOfficeAddress,
      otp,
      otpExpires,
    });

    await sendEmail(email, { subject: "VERIFICATION OTP" }, otp);
    await company.save();

    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtpForCompany = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company || company.otp !== otp || company.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields
    company.otp = null;
    company.otpExpires = null;
    await company.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: company._id, role: company.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: company._id,
        name: company.name,
        email: company.email,
        role: company.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email, role: "company" });
    if (!company || !password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { userId: company._id, role: company.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // On frontend, remove token from local storage/cookies.
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user =
      (await User.findById(req.user.userId)) ||
      (await Company.findById(req.user.userId));
    if (!user) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      website: user.website,
      description: user.description,
      profilePicture: user.profilePicture,
      linkedin: user.linkedin,
      instagram: user.instagram,
      facebook: user.facebook,
      industry: user.industry,
      companyType: user.companyType,
      numberOfEmployees: user.numberOfEmployees,
      headOfficeAddress: user.headOfficeAddress,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      website,
      description,
      linkedin,
      instagram,
      facebook,
      industry,
      companyType,
      numberOfEmployees,
      headOfficeAddress,
      password,
      education,
      experience,
    } = req.body;

    const user =
      (await User.findById(req.user.userId)) ||
      (await Company.findById(req.user.userId));
    if (!user) return res.status(404).json({ message: "Profile not found" });

    // If email is updated, process OTP verification as before
    if (email && email !== user.email) {
      const otp = generateOtp();
      const otpExpires = new Date(Date.now() + 10 * 60000);
      user.otp = otp;
      user.otpExpires = otpExpires;
      user.email = email;
      await sendEmail(
        email,
        { subject: "Verify Your New Email" },
        `Your OTP is: ${otp}`
      );
      await user.save();
      return res.status(200).json({
        message: "Email updated. Please verify your new email.",
        emailVerificationRequired: true,
      });
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update any extra fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    // For users:
    if (user.role === "user") {
      user.education = education || user.education;
      user.experience = experience || user.experience;
      user.address = address || user.address;
    }
    // For companies:
    if (user.role === "company") {
      user.address = address || user.address;
      user.website = website || user.website;
      user.description = description || user.description;
      user.linkedin = linkedin || user.linkedin;
      user.instagram = instagram || user.instagram;
      user.facebook = facebook || user.facebook;
      user.industry = industry || user.industry;
      user.companyType = companyType || user.companyType;
      user.numberOfEmployees = numberOfEmployees || user.numberOfEmployees;
      user.headOfficeAddress = headOfficeAddress || user.headOfficeAddress;
    }
    await user.save();
    res.status(200).json({
      education: user.education,
      experience: user.experience,
      resumeUrl: user.resumeUrl,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      website: user.website,
      description: user.description,
      profilePicture: user.profilePicture,
      linkedin: user.linkedin,
      instagram: user.instagram,
      facebook: user.facebook,
      industry: user.industry,
      companyType: user.companyType,
      numberOfEmployees: user.numberOfEmployees,
      headOfficeAddress: user.headOfficeAddress,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { otp } = req.body;
  try {
    const user =
      (await User.findById(req.user.userId)) ||
      (await Company.findById(req.user.userId));

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const user =
      (await User.findById(req.user.userId)) ||
      (await Company.findById(req.user.userId)); // Check for both user and company

    if (!user) {
      return res.status(404).json({ message: "User or company not found" });
    }

    user.profilePicture = req.file.path; // Save the file path
    await user.save();

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
