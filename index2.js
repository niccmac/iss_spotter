
const {nextISSTimesForMyLocation} = require(`./iss_promised`);

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let pass of passTimes) {
      console.log(`Next pass at ${new Date(pass[`risetime`])} for ${pass[`duration`]} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });