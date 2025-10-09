<p align="center">
  <img src="https://files.catbox.moe/o0i5v4.png" alt="Rimuru Bot" width="300"/>
</p>

<h1 align="center">💧 Rimuru Base</h1>
<p align="center">
  Base WhatsApp Bot simple & powerful untuk pemula yang ingin belajar membuat bot sendiri dari awal.  
  Dibuat dengan Node.js dan Baileys MD sangat cocok untuk belajar membuat fitur (case) dan mengembangkan bot pribadi.
</p>

<p align="center">
  <a href="https://github.com/ryuhandev/rimubase/stargazers"><img src="https://img.shields.io/github/stars/ryuhandev/rimubase?style=flat-square&logo=github" alt="GitHub Stars"/></a>
  <a href="https://github.com/ryuhandev/rimubase/issues"><img src="https://img.shields.io/github/issues/ryuhandev/rimubase?style=flat-square&logo=github" alt="GitHub Issues"/></a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## ✨ Features

- **💧 Full Case**
- **💧 Fully 100% No Enc**
- **💧 Bottom Image support**
- **💧 Bottom Video Support**
- **💧 Support Termux**
- **💧 Support Node V20+**
- **💧 Pairing Code Login**
- **💧 Simple Case Logic**
- **💧 Fast Response**
- **💧 Fast Installing Module**

---

<p align="center">
  <img src="https://files.catbox.moe/y5n3qb.png" alt="Rimuru Bot" width="300"/>
</p>

## 💧 Installation (Termux)

### Update Package
```
pkg update -y && pkg upgrade -y
```

### Install git & nodejs

```
pkg install git -y && pkg install nodejs
```

### Install Script

```
git clone https://github.com/ryuhandev/rimubase.git
```
```
cd rimubase
```
```
npm install
````
```
npm start
```


> Masukkan nomor WhatsApp kamu dengan awalan 62 tanpa tanda “+”.
Contoh salah: +62xxxx ❌
Contoh benar: 62xxxx ✅




---

<p align="center">
  <img src="https://files.catbox.moe/m01bz7.png" alt="Rimuru Bot" width="300"/>
</p>

💧 Cara Menambah Fitur (Case)

> Semua fitur bot disimpan di file:
sock.js



Berikut beberapa contoh dasar untuk menambah fitur:


---

🧩 1. Balasan Sederhana dengan reply

```
case 'hii': {
  reply('Halooo 👋')
}
break
```

Fungsi reply() berguna untuk mengirim teks cepat tanpa harus menulis sock.sendMessage.

---

🧩 2. Mengirim Pesan Biasa

```
case 'halo': {
  sock.sendMessage(m.chat, { text: 'Hai juga! Ada yang bisa Rimuru bantu?' }, { quoted: m })
}
break
```

---

🧩 3. Mengirim Button Message (Bottom Message)

Contoh pesan dengan dua tombol:

```
case 'menu': {
  let anu = 'Hai 👋\nBerikut beberapa fitur yang tersedia!'
  sock.send2Button(
    m.chat,
    anu,
    namabot,
    '📜 Menu', '.menu',
    '👑 Owner', '.owner',
    m
  )
}
break
```

> Pastikan fungsi send2Button sudah tersedia di base kamu (udah ada di main.js).




---

🧩 4. Mengirim Gambar

```
case 'foto': {
  sock.sendMessage(
    m.chat,
    { image: { url: 'https://telegra.ph/file/abc123.jpg' }, caption: 'Ini fotonya!' },
    { quoted: m }
  )
}
break
```

---

🧩 5. Mengirim Video

```
case 'video': {
  sock.sendMessage(
    m.chat,
    { video: { url: 'https://telegra.ph/file/abc123.mp4' }, caption: 'Nih video kamu!' },
    { quoted: m }
  )
}
break
```

---

🧩 6. Auto Reply dengan Kondisi

```
if (body.startsWith('hai')) {
  reply('Hai juga manusia 👋')
}
```

---

💧 Tips Dasar Menambah Case

1. Buka file sock.js


2. Cari bagian seperti ini:

```
switch(command) {
  case 'ping':
    reply('Pong!')
    break
}
```

3. Tambahkan case kamu di bawahnya.


4. Simpan file lalu restart bot dengan:

npm start




---

💧 Contoh Hasil Jalannya Bot

User: hii
Bot : Halooo 👋

User: menu
Bot : [Menampilkan pesan dengan tombol Menu & Owner]


---

💧 Support

Jika kamu suka project ini, bantu dengan:

⭐ Memberi bintang repo ini di GitHub

🧠 Berkontribusi dengan fitur baru

🧩 Membagikan ke teman yang ingin belajar membuat bot WhatsApp sendiri



---

<p align="center">
  <img src="https://files.catbox.moe/f8tj1b.png" alt="Rimuru Bot" width="200"/>
</p>

**Creators Contact:**  :bust_in_silhouette:
> [Github](https://github.com/ryuhandev)  
> [Telegram](https://t.me/ryuhanwired)   
> [Facebook](https://www.facebook.com/ryuhann)

---
<p align="center">
  <img src="https://files.catbox.moe/81lwta.jpg" alt="Rimuru Bot" width="300"/>
</p>

💙 Donate me :3

> [Saweria :3](https://saweria.co/ryuhanm)
---

📜 License

MIT License © [Ryuhan Minamoto](https://github.com/ryuhandev/rimubase/blob/main/LICENSE)

---
