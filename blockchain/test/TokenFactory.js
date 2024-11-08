// const {expect} = require("chai");
// const hre = require("hardhat");
// const {time} = require ("@nomicfoundation/hardhat-toolbox/network-helpers");

// describe("Token Factory", function () {
//     it("Should create the meme token succesfully", async function () {
//         const tokenCt = await hre.ethers.deployContract("TokenFactory");
//         const tx = await tokenCt.createMemeToken("FullMetalTolen", "FLM", "img://img.png", "this a FLM Token", {
//             value: hre.ethers.parseEther("0.0001")
//         });
//         const memecoins = await tokenCt.getAllMemeTokens();
//         console.log("Mememecoins", memecoins)
//     });

//     it("Should revert if incorrect value of memeToken Creation fee is passed", async function () {
//         const tokenCt = await hre.ethers.deployContract("TokenFactory");
//         await expect(tokenCt.createMemeToken("FullMetalTolen", "FLM", "img://img.png", "this a FLM Token", {
//             value: hre.ethers.parseEhter("0.001")
//         })).to.be.revertedWith("fee not paid for memetoken creation");
//     });

//     it("Should allow a user to purchase the meme token", async function () {
//         const tokenCt = await hre.ethers.deployContract("TokenFactory");
//         const tx1 = await tokenCt.createMemeToken("FullMetalTolen", "FLM", "img://img.png", "this a FLM Token", {
//             value: hre.ethers.parseEther("0.0001")
//         });
//         const memeTokenAddress = await tokenCt.memeTokenAddress(0)
//         const tx2 = await tokenCt.buyMemeToken(memeTokenAddress, 800000, {
//             value: hre.ethers.parseEther("40")
//         });
//         const memecoins = await tokenCt.getAllMemeTokens();
//         console.log("Memecoins ", memecoins)
//     })
// })


const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token Factory", function () {
    let tokenFactory;
    let owner;
    let addr1;

    // Deploy a new contract before each test
    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const TokenFactory = await ethers.getContractFactory("TokenFactory");
        tokenFactory = await TokenFactory.deploy();
        await tokenFactory.waitForDeployment();
    });

    it("Should create the meme token successfully", async function () {
        const tx = await tokenFactory.createMemeToken(
            "FullMetalToken", 
            "FLM", 
            "img://img.png", 
            "this is a FLM Token", 
            {
                value: ethers.parseEther("0.0001")
            }
        );
        await tx.wait();

        const memecoins = await tokenFactory.getAllMemeTokens();
        console.log("Memecoins", memecoins);
        
        // Add some assertions
        expect(memecoins.length).to.equal(1);
        expect(memecoins[0].name).to.equal("FullMetalToken");
        expect(memecoins[0].symbol).to.equal("FLM");
    });

    it("Should revert if incorrect value of memeToken Creation fee is passed", async function () {
        await expect(
            tokenFactory.createMemeToken(
                "FullMetalToken",
                "FLM",
                "img://img.png",
                "this is a FLM Token",
                {
                    value: ethers.parseEther("0.00001") // Incorrect fee
                }
            )
        ).to.be.revertedWith("fee not paid for memetoken creation");
    });

    it("Should allow a user to purchase the meme token", async function () {
        // First create the token
        const createTx = await tokenFactory.createMemeToken(
            "FullMetalToken",
            "FLM",
            "img://img.png",
            "this is a FLM Token",
            {
                value: ethers.parseEther("0.0001")
            }
        );
        await createTx.wait();

        // Get the token address
        const memecoins = await tokenFactory.getAllMemeTokens();
        const memeTokenAddress = memecoins[0].tokenAddress;

        // Purchase tokens
        const purchaseTx = await tokenFactory.buyMemeToken(
            memeTokenAddress,
            800000,
            {
                value: ethers.parseEther("40")
            }
        );
        await purchaseTx.wait();

        // Add assertions to verify the purchase
        const updatedMemecoins = await tokenFactory.getAllMemeTokens();
        console.log("Updated Memecoins ", updatedMemecoins);
        
        // Add appropriate assertions here based on your contract's behavior
        expect(updatedMemecoins[0].fundingRaised).to.be.above(0);
    });
});