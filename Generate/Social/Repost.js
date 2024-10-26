const fs = require("fs");
const { uniqueUsernameGenerator, adjectives, nouns } = require("unique-username-generator");

function generateRepostLinks(twitterUsernames) {
  const repostLinks = twitterUsernames.map((username) => {
    const tweetId = Math.floor(1000000000000000000 + Math.random() * 9000000000000000000);
    return `https://x.com/${username}/status/${tweetId}`;
  });
  return repostLinks;
}

function saveToFile(repostLinks) {
  const resultDir = "./Result";
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }
  fs.writeFileSync(`${resultDir}/RepostLinks.txt`, repostLinks.join("\n"));
  console.log("Data Repost Links berhasil disimpan ke RepostLinks.txt di dalam folder Result");
}

module.exports = {
  generateRepostLinks,
  saveToFile,
};
