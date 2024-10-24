# Bot Penghasil dan Pengirim Data Akun

Bot ini adalah alat otomatis untuk menghasilkan dan mengirim data akun ke API tertentu. Dirancang untuk menghasilkan berbagai jenis data akun termasuk alamat email, username Twitter dan Telegram, alamat Ethereum dan Solana, serta link repost.

## Fitur

- Menghasilkan data akun dalam jumlah besar sekaligus
- Mendukung berbagai jenis data:
  - Alamat Email
  - Username Telegram
  - Username Twitter
  - Alamat Ethereum
  - Alamat Solana
  - Link Repost Twitter
- Menyimpan data yang dihasilkan ke file lokal
- Mengirim data yang dipilih ke API eksternal
- Antarmuka command-line yang interaktif

## Persyaratan

- Node.js (versi 18 atau lebih baru)
- NPM (Node Package Manager)

## Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/marlinxfish/dummy-account-bot.git
```

2. Masuk ke direktori proyek:

```bash
cd dummy-account-bot
```

3. Install dependensi yang diperlukan:

```bash
npm install
```

## Penggunaan

1. Jalankan program dengan perintah:

```bash
npm start
```

2. Ikuti petunjuk di layar untuk:

- Menentukan jumlah akun yang ingin dihasilkan
- Memilih jenis data yang ingin dikirim ke API

## Konfigurasi

Konfigurasi API dapat diubah di file `apiConfig.json`. Pastikan untuk menyesuaikan URL dan endpoint sesuai dengan kebutuhan Anda.

## Struktur Proyek

- `index.js`: File utama program
- `Generate/`: Folder berisi modul untuk menghasilkan berbagai jenis data
- `Utils/`: Folder berisi utilitas seperti fungsi header dan API
- `Result/`: Folder tempat menyimpan hasil generate data

## Kontribusi

Kontribusi selalu diterima. Silakan buat pull request atau buka issue untuk saran dan perbaikan.

## Lisensi

[MIT License](LICENSE)
