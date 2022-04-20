// import Compound from '@compound-finance/compound-js';// const Compound = new Compound(window.ethereum)
const Compound = require('@compound-finance/compound-js');
const provider = 'https://mainnet.infura.io/v3/114f1662f8744eb7ab048928673b60fb' //'https://mainnet.infura.io/v3/' + process.env.infuraApiKey;

const cTokenToGetCompApy = Compound.cUSDC; // Pick an asset

const underlying = cTokenToGetCompApy.slice(1, 10);
const underlyingDecimals = Compound.decimals[underlying];
const cTokenDecimals = 8; // always 8
const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);
const cTokenAddr = Compound.util.getAddress(cTokenToGetCompApy);
const apxBlockSpeedInSeconds = 13.15;

async function Calculate_APY() {



  let compSpeedSupply = await Compound.eth.read(
    comptroller,
    'function compSupplySpeeds(address cToken) public returns (uint)',
    [cTokenAddr],
    { provider }
  );

  let compSpeedBorrow = await Compound.eth.read(
    comptroller,
    'function compBorrowSpeeds(address cToken) public returns (uint)',
    [cTokenAddr],
    { provider }
  );

  let compPrice = await Compound.eth.read(
    opf,
    'function price(string memory symbol) external view returns (uint)',
    [Compound.COMP],
    { provider }
  );

  let assetPrice = await Compound.eth.read(
    opf,
    'function price(string memory symbol) external view returns (uint)',
    [underlying],
    { provider }
  );

  let totalBorrows = await Compound.eth.read(
    cTokenAddr,
    'function totalBorrowsCurrent() returns (uint)',
    [],
    { provider }
  );

  let totalSupply = await Compound.eth.read(
    cTokenAddr,
    'function totalSupply() returns (uint)',
    [],
    { provider }
  );

  let exchangeRate = await Compound.eth.read(
    cTokenAddr,
    'function exchangeRateCurrent() returns (uint)',
    [],
    { provider }
  );

  // Total supply needs to be converted from cTokens
  const mantissa = 18 + parseInt(underlyingDecimals) - cTokenDecimals;
  exchangeRate = +exchangeRate.toString() / Math.pow(10, 18);

  compSpeedSupply = compSpeedSupply / 1e18; // COMP has 18 decimal places
  compSpeedBorrow = compSpeedBorrow / 1e18; // COMP has 18 decimal places
  compPrice = compPrice / 1e6;  // price feed is USD price with 6 decimal places
  assetPrice = assetPrice / 1e6;
  totalBorrows = +totalBorrows.toString() / (Math.pow(10, underlyingDecimals));
  totalSupply = (+totalSupply.toString() * exchangeRate) / (Math.pow(10, underlyingDecimals));

  // console.log('compSpeedSupply:', compSpeedSupply);
  // console.log('compSpeedBorrow:', compSpeedBorrow);
  // console.log('compPrice:', compPrice);
  // console.log('assetPrice:', assetPrice);
  // console.log('totalBorrows:', totalBorrows);
  // console.log('totalSupply:', totalSupply);
  // console.log('exchangeRate:', exchangeRate);

  const compPerDaySupply = compSpeedSupply * parseInt((60 * 60 * 24) / apxBlockSpeedInSeconds);
  const compPerDayBorrow = compSpeedBorrow * parseInt((60 * 60 * 24) / apxBlockSpeedInSeconds);

  const compSupplyApy = 100 * (Math.pow((1 + (compPrice * compPerDaySupply / (totalSupply * assetPrice))), 365) - 1);
  const compBorrowApy = 100 * (Math.pow((1 + (compPrice * compPerDayBorrow / (totalBorrows * assetPrice))), 365) - 1);

  console.log('COMP Supply APY %:', compSupplyApy);
  console.log('COMP Borrow APY %:', compBorrowApy);
  // return compSupplyApy
}


module.exports = Calculate_APY()
