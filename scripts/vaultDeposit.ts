import { ethers } from "hardhat";

const deposit = async () => {
    const depositAmount: any = ethers.utils.parseEther("0.001");
    console.log("Depositing", depositAmount / 10 ** 18 + "ETH...");

    const Vault = await ethers.getContractFactory("Vault");
    const vaultAddress = "0x92d0D94e6cB3B56C6D1E0D84b857045734538bC0" //Replace this with your deployed address
    const vaultContract = Vault.attach(vaultAddress);

    const sendEther = await vaultContract.deposit({ value: depositAmount });
    const depositTxReciept = await sendEther.wait();
    console.log(depositTxReciept.events[0].args[0]._hex.toString() / 10 ** 18 + "ETH deposited!");

};

deposit()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });