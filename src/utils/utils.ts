import { ethers } from "ethers";

export const encoder = (types: any, values: any) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const encodedParams = abiCoder.encode(types, values);
    return encodedParams.slice(2);
};

export const create2Address = (factoryAddress: any, saltHex: any, initCode: any) => {
    const create2Addr = ethers.utils.getCreate2Address(factoryAddress, saltHex, ethers.utils.keccak256(initCode));
    return create2Addr;

}

