//It will contain most of the logic for fetching the data from each API endpoint.

const request = require(`request`);
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (err, response, data) => {
    
    if (err) {
      callback(err, null, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      return callback(Error(msg),null, null);
      
    }
    const address = JSON.parse(data);
    callback(null, null, address[`ip`]);
    return;
  });
};


const fetchCoordsByIP = function(ip,callback) {
  
  request(ip, (err, response, data) => {
    if (err) {
      callback(err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      return callback(Error(msg),null, null);
      
    }
    const address = JSON.parse(data);
    let latLong = {
      "lat": address[`latitude`],
      "long": address[`longitude`]
    };
    callback(null, null, latLong);
    return;
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords[`lat`]}&lon=${coords[`long`]}&n=5`,(err, response, data) => {
    if (err) {
      callback(err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      return callback(Error(msg),null, null);
      
    }
    const address = JSON.parse(data);
    let responseList = {
      "list": address[`response`]
    };

    
    callback(null, null, responseList);
    return;




  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};

