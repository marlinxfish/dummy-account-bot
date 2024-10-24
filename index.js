const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const displayHeader = require("./Utils/Header");
const { generateTwitterUsernames, saveToFile: saveTwitterToFile } = require("./Generate/Social/Twitter");
const { generateTelegramUsernames, saveToFile: saveTelegramToFile } = require("./Generate/Social/Telegram");
const { generateEthereumAddresses, saveToFile: saveEtherToFile } = require("./Generate/Address/Ether");
const { generateRepostLinks, saveToFile: saveRepostLinksToFile } = require("./Generate/Social/Repost");
const { generateSolanaAddresses, saveToFile: saveSolanaToFile } = require("./Generate/Address/Solana");
const { generateEmails, saveToFile: saveEmailToFile } = require("./Generate/Social/Email");
const { sendAllDataToApi } = require("./Utils/api");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function generateAccounts(accountCount) {
  const twitterUsernames = generateTwitterUsernames(accountCount);
  const telegramUsernames = generateTelegramUsernames(accountCount);
  const etherAddresses = generateEthereumAddresses(accountCount);
  const repostLinks = generateRepostLinks(twitterUsernames);
  const solanaAddresses = generateSolanaAddresses(accountCount);
  const emails = generateEmails(accountCount);

  saveTwitterToFile(twitterUsernames);
  saveTelegramToFile(telegramUsernames);
  saveEtherToFile(etherAddresses);
  saveRepostLinksToFile(repostLinks);
  saveSolanaToFile(solanaAddresses);
  saveEmailToFile(emails);

  return Array.from({ length: accountCount }, (_, i) => ({
    akun: `akun${i + 1}`,
    ethAddress: etherAddresses[i].address,
    solanaAddress: solanaAddresses[i].address,
    email: emails[i],
    telegramUsername: telegramUsernames[i],
    twitterUsername: twitterUsernames[i],
    repostLink: repostLinks[i],
  }));
}

async function selectDataToSend() {
  console.log(chalk.cyan("\nPilih data yang ingin dikirim ke API (pisahkan dengan koma jika lebih dari satu):"));
  console.log(chalk.yellow("1. Email"));
  console.log(chalk.yellow("2. Telegram Username"));
  console.log(chalk.yellow("3. Twitter Username"));
  console.log(chalk.yellow("4. Ethereum Address"));
  console.log(chalk.yellow("5. Solana Address"));
  console.log(chalk.yellow("6. Repost Link"));

  const selectedDataInput = await question(chalk.green("Masukkan nomor pilihan Anda: "));
  return selectedDataInput.split(",").map((num) => num.trim());
}

async function runMainProgram() {
  try {
    const accountCount = parseInt(await question(chalk.cyan("Berapa banyak akun yang ingin dihasilkan? ")), 10);

    console.log(chalk.yellow("\nMenghasilkan akun..."));
    const accounts = await generateAccounts(accountCount);

    fs.writeFileSync("./Result/accounts.json", JSON.stringify(accounts, null, 2));
    console.log(chalk.green("Data akun berhasil disimpan ke accounts.json"));

    const selectedData = await selectDataToSend();

    rl.close();

    console.log(chalk.yellow("\nMengirim data ke API..."));
    await sendAllDataToApi(accounts, selectedData);
    console.log(chalk.green("Semua data akun yang dipilih berhasil dikirim ke API."));
  } catch (error) {
    console.error(chalk.red("Terjadi kesalahan:"), error);
  }
}

function main() {
  displayHeader("Dummy Airdrop Account Bot", () => {
    console.log(chalk.cyan("Program dimulai..."));
    console.log(chalk.gray("=".repeat(50)));

    runMainProgram();
  });
}

main();
