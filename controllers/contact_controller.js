const Contact = require("../models/contact");
const jwt = require("jsonwebtoken");

// Function for adding new contact
module.exports.addContact = async function (req, res) {
   try {
      const contact = await Contact.findOne({ contact: req.body.contact });
      
      if (contact) {
         return res.status(208).json({
            success: true,
            message: "Contact already present",
            data: {
               id: contact._id,
               contact: contact.contact,
               username: contact.username,
            },
         });
      } else {
         const newContact = await Contact.create(req.body);

         return res.status(200).json({
            success: true,
            message: "New contact added successfully",
            data: {
               id: newContact._id,
               contact: newContact.contact,
               username: newContact.username,
            },
         });
      }
   } catch (err) {
      return res.status(404).json({
         success: false,
         flag: "Error in adding new contact",
         message: JSON.stringify(err),
      });
   }
};

// Function for login
module.exports.login = async function (req, res) {
   try{
      const contact = await Contact.findOne({ contact: req.body.contact });

      if (contact && contact.username == req.body.username) {
         const token = jwt.sign({id: contact._id}, process.env.CONTACTS_API_JWT_SECRET);         

         return res.status(200).json({
            success: true,
            data: {id: contact._id, contact: contact.contact, username: contact.username, token}
         });            
      }
   }catch(err){
      return res.json({
         success: false,
         flag: "Error in username or password",
         message: JSON.stringify(err)
      });
   }
}

module.exports.fetchContacts = async function (req, res) {
   try {
      let contacts; // variable for all filtered and paginated contacts
      let results = {}; // variable for result to send in response

      // Filtering results (if filters present)
      if(req.query.id || req.query.contact || req.query.username){
         contacts = await Contact.find(req.query);
      } else {
         contacts = await Contact.find({});
      }

      // Paginating the fetched contacts
      if (req.pagination) {
         const {startIndex, endIndex, previous, next} = req.pagination;

         contacts = contacts.slice(startIndex, endIndex); // slicing required number of data

         if(previous){results.previous = previous;} // setting previous page (if present)
         if(next){results.next = next;} // setting prenextvious page (if present)
      }

      results.results = contacts; // adding all contacts to result
      
      return res.status(200).json({
         success: true,
         data: results,
      });
   } catch (err) {
      return res.json({
         success: false,
         flag: "Error in fetching contact",
         message: JSON.stringify(err),
      });
   }
};

module.exports.updateContact = async function (req, res) {
   try {
      const updatedContact = await Contact.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      
      return res.json({
         success: true,
         data: { id: updatedContact.id, contact: updatedContact.contact, username: updatedContact.username },
      });
   } catch (err) {
      return res.json({
         success: false,
         flag: "Error in updating contact",
         message: JSON.stringify(err),
      });
   }
};

module.exports.deleteContact = async function (req, res) {
   try {
      await Contact.findByIdAndDelete(req.params.id);

      return res.status(200).json({
         success: true,
         message: 'Contact deleted successfully'
      });
   } catch (err) {
      return res.json({
         success: false,
         flag: "Error in deleting contact",
         message: JSON.stringify(err),
      });
   }
};
