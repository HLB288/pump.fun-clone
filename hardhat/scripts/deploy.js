const hre = require("hardhat");

async function main() {
  console.log("Deploying TokenFactory contract...");

  // Deploy TokenFactory
  const TokenFactory = await hre.ethers.deployContract("TokenFactory");
  await TokenFactory.waitForDeployment();

  console.log("TokenFactory deployed to:", TokenFactory.target);
}

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});