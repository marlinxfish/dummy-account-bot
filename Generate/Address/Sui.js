const fs = require("fs");
const path = require("path");
const { Ed25519Keypair } = require("@mysten/sui.js/keypairs/ed25519");
const { fromB64 } = require("@mysten/sui.js/utils");

function generateSUIAddresses(count) {
  const addresses = [];

  for (let i = 0; i < count; i++) {
    const keypair = new Ed25519Keypair();

    const address = keypair.toSuiAddress();
    const privateKey = Buffer.from(keypair.export().privateKey).toString("hex");

    addresses.push({
      address,
      privateKey,
    });
  }

  return addresses;
}

function saveToFile(addresses) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }

  const content = addresses.map((addr) => `Address: ${addr.address}, Private Key: ${addr.privateKey}`).join("\n");

  fs.writeFileSync(path.join(resultDir, "SUI.txt"), content);
}

module.exports = {
  generateSUIAddresses,
  saveToFile,
};
