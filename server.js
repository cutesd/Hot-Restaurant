// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Tables (DATA) 
// =============================================================
var tables = [
    {
        name: "Valerie Blume",
        phoneNum: "303-543-5555",
        email: "val@gmail.com",
        ID: "ValBlume"
    },
    {
        name: "John Smith",
        phoneNum: "702-324-5555",
        email: "john.smith@gmail.com",
        ID: "JohnSmith"
    },
    {
        name: "Samantha Jones",
        phoneNum: "540-360-5555",
        email: "samiejones@hotmail.com",
        ID: "SamanthaJ"
    }
];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays all waitlist
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/reserve", function (req, res) {
    //
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    if (tables.length < 5) tables.push(newTable);
    else waitlist.push(newTable);

    res.json(newTable);
});

app.post("/tables/clear", (req, res) => {
    tables = [];
    waitlist = [];
    res.end();
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
