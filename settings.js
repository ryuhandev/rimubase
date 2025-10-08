const fs = require('fs')


global.namabot = "RIMURU - X" // Ganti nama bot mu
global.namaowner = "Ryuhan" // Ubah bebas
global.author = 'Ryuhan Minamoto'
global.packname = 'Made by'
global.owner = ['62xxxxx'] // UBAH NOMOR YANG MAU DI JADIKAN OWNER
// PEMISAH \\
global.sessionName = 'session'
global.prefa = ['', '!', '.', '🐦', '🐤', '🗿']
global.pmBlock = false // Mau Bot hanya bisa respon di grup, ubah jadi true

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})