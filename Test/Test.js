import fs from "fs";
import readline from "readline";
import { generateTwitterUsernames, saveToFile as saveTwitterToFile } from "../Generate/Social/Twitter.js";
import { generateTelegramUsernames, saveToFile as saveTelegramToFile } from "../Generate/Social/Telegram.js";
import { generateEthereumAddresses, saveToFile as saveEtherToFile } from "../Generate/Address/Ether.js";
import { generateRepostLinks, saveToFile as saveRepostLinksToFile } from "../Generate/Social/Repost.js";
import { sendAllDataToApi } from "../Utils/api.js"; // Mengimpor fungsi untuk mengirim data ke API

// Fungsi untuk mendapatkan input dari pengguna
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk menampilkan informasi log
function logInfo(message) {
  console.log(`ℹ️  INFO: ${message}`);
}

function logSuccess(message) {
  console.log(`✔️  SUCCESS: ${message}`);
}

function logError(message) {
  console.log(`❌ ERROR: ${message}`);
}

// Fungsi untuk menanyakan input
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const accountCount = parseInt(await question("Berapa banyak akun yang ingin dihasilkan? "), 10);
  rl.close(); // Tutup readline setelah mendapatkan input

  // Generate Twitter Usernames
  const twitterUsernames = generateTwitterUsernames(accountCount);
  saveTwitterToFile(twitterUsernames);
  logSuccess(`Data Twitter Username berhasil dibuat: ${twitterUsernames.join(", ")}`);

  // Generate Telegram Usernames
  const telegramUsernames = generateTelegramUsernames(accountCount);
  saveTelegramToFile(telegramUsernames);
  logSuccess(`Data Telegram Username berhasil dibuat: ${telegramUsernames.join(", ")}`);

  // Generate Ether Addresses
  const etherAddresses = generateEthereumAddresses(accountCount);
  saveEtherToFile(etherAddresses);
  logSuccess(`Data Ether Address berhasil dibuat: ${etherAddresses.map((addr) => addr.address).join(", ")}`);

  // Generate Repost Links
  const repostLinks = generateRepostLinks(twitterUsernames, accountCount);
  saveRepostLinksToFile(repostLinks);
  logSuccess(`Data Repost Links berhasil dibuat: ${repostLinks.join(", ")}`);

  // Create account data structure
  const accounts = [];
  for (let i = 0; i < accountCount; i++) {
    accounts.push({
      akun: `akun${i + 1}`,
      twitterUsername: twitterUsernames[i],
      telegramUsername: telegramUsernames[i],
      ethAddress: etherAddresses[i].address,
      repostLink: repostLinks[i],
    });
  }

  // Save account data to accounts.json
  fs.writeFileSync("./Result/accounts.json", JSON.stringify(accounts, null, 2));
  logSuccess("Data akun berhasil disimpan ke accounts.json");

  // Send data to the API
  await sendAllDataToApi(accounts); // Call the function to send data
  logSuccess("Semua data akun berhasil dikirim ke API.");
}

main().catch((error) => {
  logError(`Terjadi kesalahan: ${error}`);
});
