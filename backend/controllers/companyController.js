const Company = require('../models/companyModel');

exports.getCompanyById = async (req, res) => {
  try {
    // console.log(req.params,"---")
    const company = await Company.findById(req.params.id).select('-password -otp -otpExpires');
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};