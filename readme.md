# Line Intersection API

This Node.js application implements a Line Intersection API using the Express framework. The API allows you to find intersecting lines with a given linestring using the Turf.js library.

## Requirements

- Node.js (v12 or higher)

## Installation

1. Clone the repository or download the source code.

2. Install the dependencies by running the following command in the project directory:

npm i

## Usage

1. Start the server by running the following command:
node app.js

2. Once the server is running, you can send a POST request to `http://localhost:3000/api/intersection` with the following parameters:

- Request headers:
  - `api-key`: The API key for authentication (e.g., `654321`).

- Request body (JSON):
  - `lineString`: The linestring for which you want to find intersecting lines. It should be a valid GeoJSON LineString object.

3. The API will validate the linestring, find intersecting lines with the given linestring, and return the results in the response.

## Authentication

The API uses a simple API key-based authentication mechanism. To authenticate, include the `api-key` header in your requests with the valid API key. The current valid API key is `654321`.

## JSON Data

The API reads the line data from a JSON file located at `./lines.json`. Ensure that the JSON file contains valid line data in the expected format.

## Testing 
On Local Hosts: use the following link to test the API https://127.0.0.1:3000/api/intersection


The Api is  also deployed on Render use following link to check https://intersectionapi-jie0.onrender.com/api/intersection

## Valid request format
add this to post request body 
{
  "lineString":{
  "type": "LineString",
  "coordinates": [
    [-96.79512, 32.77823],
    [-96.79469, 32.77832],
    [-96.79433, 32.77728]
    ]
  }
}


