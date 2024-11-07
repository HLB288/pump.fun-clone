// require('dotenv').config()
// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     hardhat: {
//       forking: {
//         url: process.env.MAINNET_RPC_URL,
//       },
//       chainId: 1,
//     }
//   }
// };

require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY || ""]
    }
  }
};