const jwt = require('jsonwebtoken');
const Contact = require("../models/contact");

// Middleware for verifying user
module.exports.verifyUser = async function (req, res, next) {   
   try{
      // Slicing jwt token from request header
      const bearerHeader = req.headers['authorization'];
      let bearer = bearerHeader.split(' ');
      let bearerToken = bearer[1];

      // parsing id from jwt token 
      const decoded = jwt.verify(bearerToken, process.env.CONTACTS_API_JWT_SECRET);

      const contact = await Contact.findById(decoded.id); // searching for contact with id

      if (contact) {next()}
      
   }catch(err){
      return res.status(401).json({
         success: false,
         flag: 'authentication failed',
         message: JSON.stringify(err)
      });
   }
}