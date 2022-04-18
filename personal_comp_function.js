const Compound = require('@compound-finance/compound-js'); // in Node.js
const cUsdtAddress = Compound.util.getAddress(Compound.cUSDT);

async function USDTSupplyRate() {

  let supplyRatePerBlock = await Compound.eth.read(
    cUsdtAddress,
    'function supplyRatePerBlock() returns (uint)',
    [], // [optional] parameters
    {}  // [optional] call options, provider, network, ethers.js "overrides"
  );

  console.log('USDT supplyRatePerBlock:', supplyRatePerBlock.toString());

}

USDTSupplyRate()

// This code here is copied from the docs to test its import and 
// how to take its value and update the database with it.
// NEXT STEP: Experiment how to make this code work in a sperate script 
// via importing it, and using its value
// WHEN you are done with that, do the same thing in app.js and finish the middleware
