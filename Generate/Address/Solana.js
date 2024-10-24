const fs = require("fs");
const path = require("path");
const { Keypair } = require("@solana/web3.js");

function generateSolanaAddresses(count) {
  const addresses = [];

  for (let i = 0; i < count; i++) {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    const privateKey = Array.from(keypair.secretKey);

    addresses.push({ address, privateKey });
  }

  return addresses;
}

function saveToFile(addresses) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }

  const content = addresses.map((addr) => `Address: ${addr.address}, Private Key: ${addr.privateKey.join(", ")}`).join("\n");

  fs.writeFileSync(path.join(resultDir, "Solana.txt"), content);
}

module.exports = {
  generateSolanaAddresses,
  saveToFile,
};
