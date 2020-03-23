// API Initialization...
var express = require("express");
var express = express();

// Request Body Parser Initialization...
var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

// Model Imports...
var Error = require("./models/error.model");

// Server Startup...
express.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Dummy Data...
var ngoList = require("./mock-data/ngo-list.json");
var lawyersList = require("./mock-data/lawyers-list.json");
var usersList = require("./mock-data/users-list.json");
var bookingsList = require("./mock-data/bookings-list.json");

// Get NGO List...
express.get("/GetNgoList", (req, res, next) => {
    res.json(ngoList);
});

// Get Lawyers List...
express.get("/GetLawyersList", (req, res, next) => {
    res.json(lawyersList);
});

// Get Users List...
express.get("/GetUsersList", (req, res, next) => {
    res.json(usersList);
});

// Get Bookings List...
express.get("/GetBookingsList", (req, res, next) => {
    res.json(bookingsList);
});

// Get Lawyer Details...
express.post("/GetLawyerDetails", (req, res) => {
    if (req != null && req.body != null) {
        let lawyer = lawyersList.filter(x => x.id == req.body.id);
        if (lawyer != null && lawyer.length > 0) {
            res.json(lawyer[0]);
        }
        else {
            let error = new Error();
            error = {
                errorType: "Invalid Request",
                errorMessage: "Lawyer ID does not exist"
            };
            res.json(error);
        }
    }
    else {
        let error = new Error();
        error = {
            errorType: "Invalid Request",
            errorMessage: "Lawyer ID is either of invalid format or Request structure is invalid"
        };
        res.json(error);
    }
});

