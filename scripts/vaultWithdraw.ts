import { ethers } from "hardhat";

const withdraw = async () => {
    const Vault = await ethers.getContractFactory("Vault");
    const vaultAddress = "0x92d0D94e6cB3B56C6D1E0D84b857045734538bC0"; //Replace this with your deployed Vault address
    const vault = Vault.attach(vaultAddress);

    const withdraw = await vault.withdraw({ gasLimit: 1000000 });
    const withdrawRes = await withdraw.wait();
    console.log(withdrawRes.events[0].args[0]._hex.toString() / 10 ** 18 + "ETH Withdrawn!");
};

withdraw()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });