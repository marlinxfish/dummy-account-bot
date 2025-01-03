const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const displayHeader = require("./Utils/Header");
const { generateTwitterUsernames, saveToFile: saveTwitterToFile } = require("./Generate/Social/Twitter");
const { generateTelegramUsernames, saveToFile: saveTelegramToFile } = require("./Generate/Social/Telegram");
const { generateEthereumAddresses, saveToFile: saveEtherToFile } = require("./Generate/Address/Ether");
const { generateRepostLinks, saveToFile: saveRepostLinksToFile } = require("./Generate/Social/Repost");
const { generateSolanaAddresses, saveToFile: saveSolanaToFile } = require("./Generate/Address/Solana");
const { generateKaspaAddresses, saveToFile: saveKaspaToFile } = require("./Generate/Address/Kaspa");
const { generateEmails, saveToFile: saveEmailToFile } = require("./Generate/Social/Email");
const { sendAllDataToApi } = require("./Utils/api");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function generateAccounts(accountCount, selectedData) {
  const accounts = [];

  let emails = [];
  let telegramUsernames = [];
  let twitterUsernames = [];
  let etherAddresses = [];
  let solanaAddresses = [];
  let kaspaAddresses = [];
  let repostLinks = [];

  if (selectedData.includes("1")) {
    emails = generateEmails(accountCount);
    saveEmailToFile(emails);
  }

  if (selectedData.includes("2")) {
    telegramUsernames = generateTelegramUsernames(accountCount);
    saveTelegramToFile(telegramUsernames);
  }

  if (selectedData.includes("3")) {
    twitterUsernames = generateTwitterUsernames(accountCount);
    saveTwitterToFile(twitterUsernames);
  }

  if (selectedData.includes("4")) {
    etherAddresses = generateEthereumAddresses(accountCount);
    saveEtherToFile(etherAddresses);
  }

  if (selectedData.includes("5")) {
    solanaAddresses = generateSolanaAddresses(accountCount);
    saveSolanaToFile(solanaAddresses);
  }

  if (selectedData.includes("6")) {
    const repostLinks = generateRepostLinks(twitterUsernames);
    saveRepostLinksToFile(repostLinks);
  }

  if (selectedData.includes("7")) {
    kaspaAddresses = await generateKaspaAddresses(accountCount);
    saveKaspaToFile(kaspaAddresses);
  }

  for (let i = 0; i < accountCount; i++) {
    const account = { akun: `Akun ${i + 1}` };

    if (selectedData.includes("1")) {
      account.email = emails[i];
    }

    if (selectedData.includes("2")) {
      account.telegramUsername = telegramUsernames[i];
    }

    if (selectedData.includes("3")) {
      account.twitterUsername = twitterUsernames[i];
    }

    if (selectedData.includes("4")) {
      account.ethAddress = etherAddresses[i].address;
    }

    if (selectedData.includes("5")) {
      account.solanaAddress = solanaAddresses[i].address;
    }

    if (selectedData.includes("6")) {
      account.repostLink = repostLinks[i];
    }

    if (selectedData.includes("7")) {
      account.kaspaAddress = kaspaAddresses[i].address;
    }

    accounts.push(account);
  }

  return accounts;
}

async function selectDataToSend() {
  console.log(chalk.cyan("\nPilih data yang ingin dikirim ke API (pisahkan dengan koma jika lebih dari satu):"));
  console.log(chalk.yellow("1. Email"));
  console.log(chalk.yellow("2. Telegram Username"));
  console.log(chalk.yellow("3. Twitter Username"));
  console.log(chalk.yellow("4. Ethereum Address"));
  console.log(chalk.yellow("5. Solana Address"));
  console.log(chalk.yellow("6. Repost Link"));
  console.log(chalk.yellow("7. Kaspa Address"));

  const selectedDataInput = await question(chalk.green("Masukkan nomor pilihan Anda: "));
  return selectedDataInput.split(",").map((num) => num.trim());
}

async function runMainProgram() {
  try {
    const accountCount = parseInt(await question(chalk.cyan("Berapa banyak akun yang ingin dihasilkan? ")), 10);
    const selectedData = await selectDataToSend();

    console.log(chalk.yellow("\nMenghasilkan akun..."));
    const accounts = await generateAccounts(accountCount, selectedData);

    fs.writeFileSync("./Result/accounts.json", JSON.stringify(accounts, null, 2));
    console.log(chalk.green("Data akun berhasil disimpan ke accounts.json"));

    console.log(chalk.yellow("\nMengirim data ke API..."));
    await sendAllDataToApi(accounts, selectedData);
    console.log(chalk.green("Semua data akun yang dipilih berhasil dikirim ke API."));
    process.exit(0);
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
