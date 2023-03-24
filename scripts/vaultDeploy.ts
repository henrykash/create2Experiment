import { ethers } from "hardhat"
import { create2Address, encoder } from "../src/utils/utils";
const { bytecode } = require("../artifacts/contracts/Vault.sol/Vault.json");




const main = async () => {
  const unlockTime = '1679732469' // unlock time must be > deployment time.

  const factoryAddr = "0x204d8488a6999B5F11eA0c30E6B4277ADe97f2A6"; //replace with your factory address
  const saltHex = ethers.utils.id("1234");
  const initCode = bytecode + encoder(["uint"], [unlockTime]);

  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log("precomputed address:", create2Addr);

  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factory = await Factory.attach(factoryAddr);

  const lockDeploy = await factory.deploy(initCode, saltHex);
  const txReceipt = await lockDeploy.wait();
  console.log("Deployed to:", txReceipt.events[0].args[0]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
