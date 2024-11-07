const {expect} = require("chai");
const hre = require("hardhat");
const {time} = require ("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token Factory", function () {
    it("Should create the meme token succesfully", async function () {
        const tokenCt = await hre.ethers.deployContract("TokenFactory");
        const tx = await tokenCt.createMemeToken("FullMetalTolen", "FLM", "img://img.png", "this a FLM Token", {
            value: hre.ethers.parseEther("0.0001")
        });
        const memecoins = await tokenCt.getAllMemeTokens();
        console.log("Mememecoins", memecoins)
    });
})
