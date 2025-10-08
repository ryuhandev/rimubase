//di folder image, kalian bisa add foto apapun bebas, misal kalian mau pakai foto tersebut untuk menu bot, atau foto qris kalian. jika kalian malas upload di folder image, kalian malas taro di folder image bisa upload image nya ke link png/jpg, dengan cara cari aja web "catboxmoe" di google, lalu upload dan copy link nya. lalu kalian bisa fetch kan ke case masing' contoh:

case "tes":
        await sock.sendMessage(from, {
          image: { url: "https://link-kalian/foto-yang-kalian-upload.png" }, // Ganti link foto di sini
          caption: "haloo",
        })
        break