const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config();
import { ethers } from "hardhat";

// CHAINLINK USDT/ETH: 	0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46

async function main() {
  // interact with uniswap swapTokenForExactToken function
  // swap usdt to dai
  // TO-DO
  // erc20 token interface
  // Approve the uniswap contract
  // check balance of the signer before swap
  // swap token calling the function
  // check balance after swap

  // CONSUMER CONTRACT ADDRESS ON ETH MAINNET: 0x2519fd2dc7c9b2ad3e9ea18c71b5df3133ca40e7

  const PriceFeed = await ethers.getContractFactory("PriceConsumerV3");
  const price = await PriceFeed.deploy();
  await price.deployed();

  console.log("Address is: ", price.address);

  const getLatestPrice = await price.getLatestPrice();
  console.log("GET LATEST PRICE: ", getLatestPrice);

//   const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//   const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";


    const amountOut = 2000e6;


    const USDTHolder = "0xa7a93fd0a276fc1c0197a5b5623ed117786eed06";
    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner1 = await ethers.getSigner(USDTHolder);

    const ETHUSDAggregator = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner2 = await ethers.getSigner(USDTHolder);





    const Swap = await ethers.getContractFactory("Swap");
    const swap = await Swap.deploy();
    await swap.deployed();

    console.log("Swap Address is: ", swap.address);


    // function setPriceFeed(address _tokenaddr, address _addrFeedInput)



  const setPriceFeed = await swap.setPriceFeed(USDTAddress, "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419");
  console.log("GET LATEST PRICE: ", getLatestPrice);

    
  return;





  //   const UNISWAPRouter = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
  //   //   const _value = ethers.utils.parseEther("1");


  //   //   const MULTISIG = await ethers.getContractAt("IMultiSig", CONTRACTADDRESS);

  //   const USDT = await ethers.getContractAt(
  //     "IERC20",
  //     USDTAddress,
  //     impersonatedSigner
  //   );
  //   const DAI = await ethers.getContractAt("IERC20", DAIAddress);
  //   const ROUTER = await ethers.getContractAt(
  //     "IUniswap",
  //     UNISWAPRouter,
  //     impersonatedSigner
  //   );
  //   //   console.log("USDT LOG: ", USDT);

  //   await USDT.approve(UNISWAPRouter, amountOut);
  //   const usdtBal = await USDT.balanceOf(impersonatedSigner.address);
  //   const daiBal = await DAI.balanceOf(impersonatedSigner.address);
  //   console.log("BALANCE BEFORE SWAP: ", usdtBal, daiBal);

  //   // ethers.utils.parseUnits("3000", "18")
  //   // await ROUTER.swapTokensForExactTokens(
  //   //   amountOut,
  //   //   3000e6,
  //   //   [USDTAddress, DAIAddress],
  //   //   impersonatedSigner.address,
  //   //   Math.floor(Date.now() /1000) *(60 * 10),
  //   //   {gasLimit: ethers.utils.hexlify(1000000)}
  //   //   );

  //   const liquidity = await ROUTER.addLiquidity(
  //     USDTAddress,
  //     DAIAddress,
  //     4000,
  //     3000,
  //     1000,
  //     1000,
  //     impersonatedSigner.address,
  //     Math.floor(Date.now() /1000) *(60 * 10),
  //   )

  //   console.log("LIQUIDITY: ", liquidity);

  // //   function addLiquidity(
  // //     address tokenA,
  // //     address tokenB,
  // //     uint amountADesired,
  // //     uint amountBDesired,
  // //     uint amountAMin,
  // //     uint amountBMin,
  // //     address to,
  // //     uint deadline
  // // ) external returns (uint amountA, uint amountB, uint liquidity);

  //   const usdtBalAfter = await USDT.balanceOf(impersonatedSigner.address);
  //   const daiBalAfter = await DAI.balanceOf(impersonatedSigner.address);

  //   console.log("BALANCE AFTER SWAP: ", usdtBalAfter, daiBalAfter);

  //   // https://mainnet.infura.io/v3/72415572d8584004ac1cb90b5589e2f1
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
