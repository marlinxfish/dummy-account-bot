import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";

const displayHeader = async () => {
  // Tampilkan header dengan font ASCII
  console.log(chalk.cyan(figlet.textSync("Bot Auto Send", { horizontalLayout: "full" })));

  const spinner = ora({
    text: chalk.yellow("Initializing the bot..."),
    color: "cyan",
  }).start();

  // Simulasi proses async
  setTimeout(() => {
    spinner.succeed(chalk.green("✔ Bot initialized successfully!"));

    // Tampilkan informasi dengan warna dan styling
    console.log(chalk.magentaBright.bold("Created By Marlin"));
    console.log(chalk.blueBright.bold("Komunitas Ternak Lele"));
  }, 2000);
};

// Ekspor fungsi untuk digunakan di file lain
displayHeader();
