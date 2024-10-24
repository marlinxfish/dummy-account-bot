const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

function generateEthereumAddresses(count) {
  const addresses = [];

  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const privateKey = wallet.privateKey;

    addresses.push({ address, privateKey });
  }

  return addresses;
}

function saveToFile(addresses) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }

  const content = addresses.map((addr) => `Address: ${addr.address}, Private Key: ${addr.privateKey}`).join("\n");

  fs.writeFileSync(path.join(resultDir, "Ethereum.txt"), content);
}

module.exports = {
  generateEthereumAddresses,
  saveToFile,
};
