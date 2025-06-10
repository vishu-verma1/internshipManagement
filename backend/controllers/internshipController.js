const Internship = require('../models/internshipModel');
const User = require('../models/userModel');
const { sendNotification } = require('../services/notifcationService');

exports.createInternship = async (req, res) => {
  try {
    // console.log(req.body,"----");
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can post internships' });
    }
    const internship = new Internship({ ...req.body, companyId: req.user.userId });
    await internship.save();

    // Notify eligible users
    const users = await User.find({ role: 'user', skills: { $in: internship.skillsRequired } });
    for (const user of users) {
      await sendNotification(user.email, internship.title);
    }

    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInternships = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          // For an array field, we use $in + regex
          { skillsRequired: { $in: [new RegExp(search, "i")] } }
        ]
      };
    }

    const internships = await Internship.find(query).populate('companyId', 'name email profilePicture') .sort({ createdAt: -1 });
;
    res.status(200).json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompanyInternships = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can view their internships" });
    }
    const { search } = req.query;
    // Base query: internships posted by this company
    let query = { companyId: req.user.userId };
    if (search) {
      // Merge additional filtering
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { skillsRequired: { $in: [new RegExp(search, "i")] } }
      ];
    }
    const internships = await Internship.find(query);
    res.status(200).json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    if (internship.companyId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this internship' });
    }
    await internship.deleteOne();
    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};