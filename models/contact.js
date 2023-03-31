const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   contact: {
      type: Number,
      required: true,
   },
   username: {
      type: String,
      required: true,
   },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;