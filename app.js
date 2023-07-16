// Importing required dependencies
const express = require("express");
const turf = require("@turf/turf");
const fs = require("fs");
const bodyParser = require("body-parser");

// initialize express application
const app = express();

app.use(bodyParser.json());
app.use(authenticate);

// Middleware for authentication
function authenticate(req, res, next) {
  // Get the API key passed in 'api-key' header
  const apiKey = req.headers["api-key"];
  if(!apiKey) {
    return res.status(400).json({ message: "Missing API-Key" });
  }

  // Perform authentication logic here (e.g., check if apiKey is valid)
  if (apiKey === "654321") {
    // Authentication successful
    // Proceed to the next middleware/route handler
    next();
  } else {
    // Authentication failed
    return res.status(401).json({ message: "Wrong API-key " });
  }
}

// Function to find intersecting lines with a given linestring
function findIntersectingLines(linestringFeature, lines) {
  const intersectingLines = [];
  let id = 0;

  // Iterarate through array of lines
  lines.forEach((line) => {
    const lineFeature = turf.lineString(line.line.coordinates);

    id += 1;
    const intersection = turf.lineIntersect(linestringFeature, lineFeature);

    const formattedId = id.toString().padStart(2, "0");
    const lineId = "L" + formattedId;
    // console.log(lineId)

    if (intersection.features.length > 0) {
      intersectingLines.push({ lineId, intersection });
    }
  });

  return intersectingLines;
}

// Read the contents of the JSON file and Parse the JSON data into an array of lines
const jsonFilePath2 = "./lines.json";
const jsonData2 = fs.readFileSync(jsonFilePath2, "utf-8");
const lines = JSON.parse(jsonData2);

// Protected POST Request API
app.post("/api/intersection", (req, res) => {
  var lineString = req.body.lineString;
  // Perform validation on the linestring
  if (!lineString) {
    return res.status(500).json({ message: "Linestring is missing" });
  }

  //  Ensure linestring is a valid GeoJSON LineString
  if (
    !lineString.type ||
    lineString.type !== "LineString" ||
    !lineString.coordinates
  ) {
    return res.status(500).json({ message: "Invalid linestring format" });
  }
  var lineString = turf.lineString(lineString.coordinates);

  const intersectingLines = findIntersectingLines(lineString, lines);
  res.json({
    intersectingLines: intersectingLines,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
