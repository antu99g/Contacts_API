const Contact = require('../models/contact');

module.exports.paginateResults = async function (req, res, next) {
   if(req.query.page && req.query.limit){
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const contacts = await Contact.find({});
      
      // took length instead of (length-1) since we will slice the array later
      const maxIndex = contacts.length;

      // setting the start and end index for slicing
      const startIndex = (page - 1) * limit;
      let endIndex = (page * limit);
      // if request limit is more than the length of data then send till last
      endIndex = endIndex > maxIndex ? maxIndex : endIndex;

      // data or previous and next page will be sent with response
      let previous = startIndex > 0 ? {page: (page - 1), limit: startIndex} : null;
      let next = endIndex < maxIndex ? { page: page + 1, limit: maxIndex - endIndex } : null;

      req.pagination = { startIndex, endIndex, previous, next };
   } else if(req.query.limit) {
      const startIndex = 0;
      const endIndex = parseInt(req.query.limit) - 1;
      req.pagination = { startIndex, endIndex };
   }
   next();
}