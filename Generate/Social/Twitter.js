const fs = require("fs");
const path = require("path");
const { uniqueUsernameGenerator, adjectives, nouns } = require("unique-username-generator");

function generateTwitterUsernames(count) {
  const usernames = [];

  for (let i = 0; i < count; i++) {
    const username = uniqueUsernameGenerator({
      dictionaries: [adjectives, nouns],
      separator: "",
      randomDigits: 3,
      length: 12,
    });
    usernames.push(username);
  }

  return usernames;
}

function saveToFile(usernames) {
  const resultDir = path.join(__dirname, "../../Result");
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }
  fs.writeFileSync(path.join(resultDir, "TwitterUsernames.txt"), usernames.join("\n"));
  console.log(`Data berhasil disimpan ke TwitterUsernames.txt di dalam folder Result`);
}

module.exports = {
  generateTwitterUsernames,
  saveToFile,
};
