const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "marlin.com"];

function generateEmails(count) {
  const emails = [];

  for (let i = 0; i < count; i++) {
    const name = faker.internet.userName();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${name}@${domain}`;
    emails.push(email);
  }

  return emails;
}

function saveToFile(data) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }

  const filePath = path.join(resultDir, "Emails.txt");
  const content = data.join("\n");

  fs.writeFileSync(filePath, content);
  console.log(`Data berhasil disimpan ke ${filePath}`);
}

module.exports = {
  generateEmails,
  saveToFile,
};
