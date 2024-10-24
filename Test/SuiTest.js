const { generateSUIAddresses, saveToFile } = require("../Generate/Address/Sui");

async function main() {
  try {
    console.log("Starting SUI address generation...");

    // Generate 5 SUI addresses
    const numberOfAddresses = 5;
    const addresses = generateSUIAddresses(numberOfAddresses);

    // Log the generated addresses to console
    console.log("\nGenerated Addresses:");
    addresses.forEach((addr, index) => {
      console.log(`\nAddress ${index + 1}:`);
      console.log(`Address: ${addr.address}`);
      console.log(`Private Key: ${addr.privateKey}`);
    });

    // Save addresses to file
    saveToFile(addresses);
    console.log("\nAddresses have been saved to Result/SUI.txt");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
