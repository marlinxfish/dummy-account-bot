const axios = require("axios");
const fs = require("fs");
const apiConfig = require("./apiConfig.json");

function readAccountsJson() {
  const rawData = fs.readFileSync("./Result/accounts.json");
  return JSON.parse(rawData);
}

async function sendDataToApi(account) {
  const url = `${apiConfig.baseUrl}${apiConfig.endpoints.sendData}`;
  const payload = {};

  // Membuat payload berdasarkan konfigurasi dan data akun
  for (const [key, value] of Object.entries(apiConfig.payload)) {
    if (account[value]) {
      payload[key] = account[value];
    }
  }

  try {
    const response = await axios.post(url, payload);
    console.log(`Data untuk ${account.akun} berhasil dikirim:`, response.data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(`Gagal mengirim data untuk ${account.akun}:`, error.message);
    return {
      status: error.response ? error.response.status : null,
      error: error.response ? error.response.data : error.message,
    };
  }
}

function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function sendAllDataToApi() {
  const accounts = readAccountsJson();
  for (const account of accounts) {
    const result = await sendDataToApi(account);
    console.log(`Status code untuk ${account.akun}:`, result.status);
    await delay(5000); // Tunggu 5 detik antara pengiriman
  }
}

module.exports = {
  sendDataToApi,
  sendAllDataToApi,
};
