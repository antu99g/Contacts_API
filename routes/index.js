const express = require("express");
const router = express.Router();

// Controller
const contactController = require("../controllers/contact_controller");


// Middleware to check authorization
const verifyUser = require("../middlewares/authentication").verifyUser;

// Middleware to pagination
const paginateResults = require("../middlewares/pagination").paginateResults;




// Route for adding new contact
router.post("/contact", contactController.addContact);

// Route for login
router.post("/contact/login", contactController.login);

// Route for fetching contacts by id, username or contact number
router.get("/contacts", verifyUser, paginateResults, contactController.fetchContacts);

// Route for updating a contact
router.put("/contact/:id", verifyUser, contactController.updateContact);

// Route for deleting a contact
router.delete("/contact/:id", verifyUser, contactController.deleteContact);


module.exports = router;