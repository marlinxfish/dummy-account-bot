const fs = require("fs");
const path = require("path");
const { initKaspaFramework } = require("@kaspa/wallet");
const { PrivateKey } = require("@kaspa/core-lib");

async function generateKaspaAddresses(count) {
  await initKaspaFramework();
  const addresses = [];

  for (let i = 0; i < count; i++) {
    try {
      const randomSecretKey = new PrivateKey();
      const address = randomSecretKey.toAddress("kaspa").toString();
      const privateKey = randomSecretKey.toString();

      addresses.push({ address, privateKey });
    } catch (error) {
      console.error(`Error generating address ${i + 1}:`, error);
    }
  }

  return addresses;
}

function saveToFile(addresses) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }

  const content = addresses.map((addr) => `Address: ${addr.address}, Private Key: ${addr.privateKey}`).join("\n");

  fs.writeFileSync(path.join(resultDir, "Kaspa.txt"), content);
  console.log("Data Kaspa Address berhasil disimpan ke Kaspa.txt di dalam folder Result");
}

module.exports = {
  generateKaspaAddresses,
  saveToFile,
};
