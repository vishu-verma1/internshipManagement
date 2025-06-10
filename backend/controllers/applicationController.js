const Application = require("../models/apllicationModel");
const Internship = require("../models/internshipModel");

exports.applyToInternship = async (req, res) => {
  try {
    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      userId: req.user.userId,
      internshipId: req.params.internshipId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this internship." });
    }

    // Create a new application
    const application = new Application({
      userId: req.user.userId,
      internshipId: req.params.internshipId,
    });
    await application.save();
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.userId,
    }).populate({
      path: "internshipId",
      populate: {
        path: "companyId", // Populate the companyId field
        select: "name profilePicture", // Include only the name and profilePicture fields
      },
    });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidatesForInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    // Find all applications for this internship and populate candidate details
    const applications = await Application.find({ internshipId }).populate(
      "userId",
      "name email skills resumeUrl profilePicture phone education experience address"
    );

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // expected to be "accepted" or "rejected"
    const applicationId = req.params.id;

    // Find the application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ensure that the company updating this application actually posted the internship
    const internship = await Internship.findById(application.internshipId);
    if (!internship || internship.companyId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    // Update status if it is still pending
    if (application.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Application has already been processed" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    application.status = status;
    await application.save();

    res
      .status(200)
      .json({
        message: "Application status updated successfully",
        application,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAcceptedCandidates = async (req, res) => {
  try {
    const { internshipId } = req.params;

    // Fetch applications with status "accepted" for the given internship
    const acceptedCandidates = await Application.find({
      internshipId,
      status: "accepted",
    }).populate("userId",
      "name email skills resumeUrl profilePicture phone education experience address");

    res.status(200).json(acceptedCandidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};