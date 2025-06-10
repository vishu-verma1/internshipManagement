const Contact = require('../models/contactModel');

exports.submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};