// API Initialization...
var express = require("express");
var express = express();

// Port Initialization...
var port = process.env.PORT || 3000;

// Request Body Parser Initialization...
var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

// Model Imports...
var Error = require("./models/error.model");

// Server Startup...
express.listen(port, () => {
    console.log("Server running on port " + port);
});

// Dummy Data...
var ngoList = require("./mock-data/ngo-list.json");
var lawyersList = require("./mock-data/lawyers-list.json");
var usersList = require("./mock-data/users-list.json");
var bookingsList = require("./mock-data/bookings-list.json");

var processRequest = require("./business-logic/request-processor");

// Connection Test...
express.get("/", (req, res, next) => {
    var p = new processRequest();
    p.getLawyersList().then(response => {
        res.json(response);
    });
})

// Get NGO List...
express.get("/GetNgoList", (req, res, next) => {
    res.json(ngoList);
});

// Get Lawyers List...
express.get("/GetLawyersList", (req, res, next) => {
    var p = new processRequest();
    p.getLawyersList().then(response => {
        res.json(response);
    });
});

// Register New Lawyer...
express.post("/RegisterLawyer", (req, res) => {
    if (req != null && req.body != null) {
        var p = new processRequest();
        p.registerLawyer(req.body).then(response => {
            res.json(response);
        });
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

