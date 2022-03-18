const request = require('request-promise-native');


const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};
const fetchCoordsByIP = function(body) {
  let ipAdress = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ipAdress}?apikey=51adcce0-a64e-11ec-8ebc-d773bbc2c2bc`)
};
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };