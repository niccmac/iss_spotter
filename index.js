// It will require and run our main fetch function.

// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, code, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  if (ip) {
    fetchCoordsByIP(`https://api.freegeoip.app/json/${ip}?apikey=51adcce0-a64e-11ec-8ebc-d773bbc2c2bc`, (err, response, data) => {
      if (err) {
        console.log("It didn't work!" , err);
        return;
      }
      fetchISSFlyOverTimes(data, (err, response, data) => {
        if (err) {
          console.log("It didn't work!" , err);
          return;
        }

        for (let pass of data.list) {
          console.log(`Next pass at ${new Date(pass[`risetime`])} for ${pass[`duration`]} seconds!`);
        }

        // console.log('It worked! Returned data:' , data);
        // console.log('It worked! Returned data.list:' , data.list[0]);
      });
    });
  }
 
});





