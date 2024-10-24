import chalk from "chalk";
import Table from "cli-table3";

// Function to log info with a certain style
export const logInfo = (message) => {
  console.log(chalk.cyan(`ℹ️  INFO: ${message}`));
};

// Function to log success messages
export const logSuccess = (message) => {
  console.log(chalk.green(`✔️  SUCCESS: ${message}`));
};

// Function to log errors
export const logError = (message) => {
  console.log(chalk.red(`❌ ERROR: ${message}`));
};

// Function to display data in a table
export const logTable = (headers, data) => {
  const table = new Table({
    head: headers.map((header) => chalk.yellow(header)),
    colWidths: headers.map(() => 20),
  });

  data.forEach((row) => {
    table.push(row);
  });

  console.log(table.toString());
};
