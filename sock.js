require('./settings')
const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType
} = require('@whiskeysockets/baileys')
const fs = require('fs');
const os = require('os')
const upload = require('./lib/uploader')
const util = require('util');
const chalk = require('chalk');
const speed = require('performance-now') 
const cheerio = require('cheerio')
const axios = require('axios');
const moment = require('moment-timezone');
const ms = toMs = require('ms');
const FormData = require("form-data");
const similarity = require('similarity');
const didyoumean = require('didyoumean');
const {
	fromBuffer
} = require('file-type')
const {
    clockString,
    formatp
} = require("./lib/myfunc")
const {
	fetchBuffer
} = require("./lib/myfunc2")
const fetch = require('node-fetch')
const {
	exec,
	spawn,
	execSync
} = require("child_process")
const fsx = require('fs-extra')

const {
	smsg,
	fetchJson,
	getBuffer
} = require('./lib/simple')

async function getGroupAdmins(participants) {
	let admins = []
	for (let i of participants) {
		i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
	}
	return admins || []
}

const path = require('path')

function msToDate(mse) {
	temp = mse
	days = Math.floor(mse / (24 * 60 * 60 * 1000));
	daysms = mse % (24 * 60 * 60 * 1000);
	hours = Math.floor((daysms) / (60 * 60 * 1000));
	hoursms = mse % (60 * 60 * 1000);
	minutes = Math.floor((hoursms) / (60 * 1000));
	minutesms = mse % (60 * 1000);
	sec = Math.floor((minutesms) / (1000));
	return days + " Days " + hours + " Hours " + minutes + " Minutes";
}

const isUrl = (url) => {
	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const runtime = function (seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const jsonformat = (string) => {
	return JSON.stringify(string, null, 2)
}

module.exports = sock = async (sock, m, chatUpdate, store, opengc, antilink, antiwame, antilink2, antiwame2, set_welcome_db, set_left_db, set_proses, set_done, set_open, set_close, sewa, _welcome, _left, db_respon_list, ) => {
	try {
		const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '.'
const bady = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ' '
		var budy = (typeof m.text == 'string' ? m.text : '')
		const isCmd = /^[_=|~!?#/$%^&.+-,\\\^]/.test(body)
		const prefix = isCmd ? budy[0] : ''
		const defPrefix = '.';
		const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
		const args = body.trim().split(/ +/).slice(1)
		const pushname = m.pushName || "No Name"
		const botNumber = await sock.decodeJid(sock.user.id)
		const isCreator = ["6285279522326@s.whatsapp.net", botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const text = q = args.join(" ")
		const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const quoted = m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''
		const isMedia = /image|video|sticker|audio/.test(mime)
		const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat).catch(e => {}) : ''
		const groupName = m.isGroup ? groupMetadata.subject : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		const from = mek.key.remoteJid
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
		const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')

		const reply = async (text) => {
			return await sock.sendMessage(from, { text: text }, { quoted: m})
		}
		
	// Kalau pmBlock aktif, bot ignore chat pribadi
if (pmBlock && !m.isGroup && !isOwner) return

if (m.message && !m.key.fromMe) {
    const time = new Date().toLocaleString()
    const fromUser = `${pushname || 'No Name'} (${m.sender})`
    const inChat = m.isGroup ? `${pushname} (${m.chat})` : `Chat Pribadi (${m.chat})`
    const msgType = budy || m.mtype

    let logMsg = `
${chalk.cyan.bold("╭─────────────────────────────")}
${chalk.cyan.bold("│ ")}${chalk.bgMagenta.black(" RIMURU - X ")} ${chalk.white("• Log Message")}
${chalk.cyan.bold("│")}
${chalk.cyan.bold("│ ")}${chalk.blueBright("📅 Time   :")} ${chalk.green(time)}
${chalk.cyan.bold("│ ")}${chalk.blueBright("👤 From   :")} ${chalk.yellow(fromUser)}
${chalk.cyan.bold("│ ")}${chalk.blueBright("💬 In     :")} ${chalk.magenta(inChat)}
${chalk.cyan.bold("│ ")}${chalk.blueBright("📌 Type   :")} ${chalk.cyan(msgType)}
${chalk.cyan.bold("╰─────────────────────────────")}
`

    console.log(logMsg)
}

function parseMention(text = '') {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
      function listcase() {
    const filePath = './sock.js';
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const caseRegex = /case\s+(['"`]?)([a-zA-Z0-9_]+)\1:/g;
        const matches = [...fileContent.matchAll(caseRegex)];
        const cases = matches.map(match => match[2]);
        return cases;
    } catch (error) {
        console.error(`Gagal membaca file: ${error.message}`);
        return [];
    }
}

          const uploadBtch = async (buffer) => {
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  let res = await fetch("https://file.btch.rf.gd/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  let data = await res.json();
  let resultUrl = data.result ? data.result.url : '';
  return resultUrl;
}

		async function getGcName(groupID) {
			try {
				let data_name = await sock.groupMetadata(groupID)
				return data_name.subject
			} catch (err) {
				return '-'
			}
		}
        function getWeton() {
        const dayNames = ["ᴍɪɴɢɢᴜ", "ꜱᴇɴɪɴ", "ꜱᴇʟᴀꜱᴀ", "ʀᴀʙᴜ", "ᴋᴀᴍɪꜱ", "ᴊᴜᴍᴀᴛ", "ꜱᴀʙᴛᴜ"];
        const pasaranNames = ["ʟᴇɢɪ", "ᴘᴀʜɪɴɢ", "ᴘᴏɴ", "ᴡᴀɢᴇ", "ᴋʟɪᴡᴏɴ"];
        const currentDate = new Date();
        const day = currentDate.getDay();
        const pasaran = (currentDate.getDate() + 5) % 5;
        return dayNames[day] + " " + pasaranNames[pasaran];
    }

    // Format durasi
    function formatDuration(timeElapsed) {
  let seconds = Math.floor(timeElapsed / 1000) % 60;
  let minutes = Math.floor(timeElapsed / (1000 * 60)) % 60;
  let hours = Math.floor(timeElapsed / (1000 * 60 * 60)) % 24;
  let days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  let months = Math.floor(days / 30) % 12;
  let years = Math.floor(days / 365);

  let durationParts = [];
  if (years > 0) durationParts.push(`${years} Tahun`);
  if (months > 0) durationParts.push(`${months} Bulan`);
  if (days > 0) durationParts.push(`${days % 30} Hari`);
  if (hours > 0) durationParts.push(`${hours} Jam`);
  if (minutes > 0) durationParts.push(`${minutes} Menit`);
  if (seconds >= 0) durationParts.push(`${seconds} Detik`);

  return durationParts.join(', ');
}

        
        async function appenTextMessage(text, chatUpdate) {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: sock.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, sock.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
sock.ev.emit('messages.upsert', msg)
}
        
        function sendReaction(emoji) {
            sock.sendMessage(from, {
                react: {
                  text: emoji,
                  key: m.key
                }})
            }
 
          function loading() {
          reply('Bentar Bang Prosess...')
          }
          
		function pickRandom(list) {
			return list[Math.floor(Math.random() * list.length)]
		}
        if(!isCreator && !m.isGroup) return
       sock.readMessages([m.key])
        if(command) {
sock.sendPresenceUpdate('composing', m.chat);
           }
        
        
        
// TEMPAT TAMBAHIN FITUR, TYPE NYA CASE//
        
        
		switch (command) {
		
   //HANYA CONTH FITUR CEK SERVER, SISA NYA ADD SESUKA HATI KALIAN :3//
		
                case 'tes': case 'test': case 'bot': {
    let timestamp = speed()
    let latensi = speed() - timestamp
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    let { getSystemUsage } = require('./lib/ping.js')
    let data = await getSystemUsage()

    let anu = `
╭┈〔 ＳＴＡＴＵＳ 〕
│▣ Bot Name   : ${namabot}
│▣ Status     : Online ✅
│▣ Ping       : ${latensi.toFixed(3)} ms
│▣ Uptime     : ${uptime}
╰─────────────

╭┈〔 ＳＹＳＴＥＭ 〕
│⚡ CPU     : ${data.CPU}
│💾 RAM     : ${data.RAM}
│📂 Storage : ${data.STORAGE}
╰─────────────

╭┈〔 ＤＥＴＡＩＬ 〕
│ Total Storage : ${data.details.totalStorage}
│ Used Storage  : ${data.details.usedStorage}
╰─────────────
`

    sock.send2Button(m.chat, anu, namabot, '📜 Menu', '.menu', '👑 Owner', '.owner', m)
}
break
                case 'self': {
           if(!isCreator) return
                sock.public = false
              reply('done self')
                    }
                break
                
                
                case 'public': {
                    sock.public = true
                    reply('Done Public')
                    }
                break
                
                
                
                case 'get': case 'fetch': {
    if (!/^https?:\/\//.test(text)) return reply('Awali *URL* dengan http:// atau https://')
    let url = new URL(text)
    let res = await fetch(url)
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
        return reply(`Content-Length: ${res.headers.get('content-length')}`)
    }
    let headers = Array.from(res.headers.entries())
        .map(([key, value]) => `*${key}:* ${value}`)
        .join('\n')
    let responseDetails = `*Headers Respons:*\n${headers}`
    if (!/text|json/.test(res.headers.get('content-type'))) {
        await sock.sendFile(m.chat, url, 'file', `${responseDetails}\n\nURL: ${text}`, m);
    } else {
        let txt = await res.buffer()
        try {
       txt = JSON.stringify(JSON.parse(txt + ''), null, 2)
        } catch (e) {
            txt = txt + ''
        } finally {
            m.reply(`${txt.slice(0, 65536)}`)
        }
    }
}
break



                case 'sticker': case 's': case 'stickergif': case 'sgif': case 'stiker':{
	if (!quoted) return reply(`*Reply Video/Image With Caption* ${prefix + command}`)
	
    try {
	if (/image/.test(mime)) {
		await sendReaction('⏳')
		let media = await quoted.download()
		let encmedia = await sock.sendImageAsSticker(m.chat, media, m, { packname: packname, author: author })
		await fs.unlinkSync(encmedia)
		} else if (/video/.test(mime)) {
            await sendReaction('⏳')
			if ((quoted.msg || quoted).seconds > 11) return reply('*Maximum 10 seconds!*')
			let media = await quoted.download()
			let encmedia = await sock.sendVideoAsSticker(m.chat, media, m, { packname: packname, author: author })
			await fs.unlinkSync(encmedia)
			} else {
				reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
				}
        } catch (e) {
            console.error(e)
            reply('Terjadi Kesalahan, Mohon Ulangi beberapa saat lagi')
            }
				}
				break
				
				
				
				case 'toimage': case 'toimg': {
	if (!quoted) return reply('Reply image')
	if (!/webp/.test(mime)) return reply(`Reply sticker with caption *${prefix + command}*`)
	await loading()
	let media = await sock.downloadAndSaveMediaMessage(quoted)
	let ran = await getRandom('.png')
	exec(`ffmpeg -i ${media} ${ran}`, (err) => {
		fs.unlinkSync(media)
		if (err) return reply(`${err}`)
		let bufferimg13x = fs.readFileSync(ran)
		sock.sendMessage(m.chat, { image: bufferimg13x }, { quoted: m })
		fs.unlinkSync(ran)
		})
		}
		break
		
		
                case 'tovideo': case 'tomp4': case 'tovid': {
        let { webp2mp4, webp2png } = require('./lib/webp2mp4');
                      if (!/webp/.test(mime)) return reply(`Balas stiker dengan caption *${prefix + command}*`)
  let media = await m.quoted.download();
  let out = Buffer.alloc(0);
  await loading()
    out = await webp2mp4(media);
    const vd = await getBuffer(out);
    await sock.sendFile(m.chat, vd, 'out.mp4', null, m);

                    }
                    break
                    
           
         			case 'owner':
			case 'creator': {
				sock.sendContact(m.chat, global.owner, m)
			}
			break
            case 'kick':{
         	if (!m.isGroup) return reply("Hanya Dapat Di Gunakan Di Group")
         if (!isBotAdmins) return reply("Bot Bukan Admin")
         if (!isAdmins) return reply("Fitur Ini Hanya Dapat Di Gunakan Oleh Admin")
         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
          if(!users) return reply('Tag/reply orangnya')
         if(users == m.sender) return reply(`Tidak Bisa kick diri sendiri`)
         try {
         await sock.groupParticipantsUpdate(m.chat, [users], 'remove')
             } catch(e) {
                 reply(`${e}`)
                 }
         }
         break
         
         
         case 'add': {
    if (!m.isGroup) return reply("Hanya Dapat Di Gunakan Di Group")
    if (!isBotAdmins) return reply("Bot Bukan Admin")
    if (!isAdmins) return reply("Fitur Ini Hanya Dapat Di Gunakan Oleh Admin")
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
            if(!users) return reply('Tag/reply orangnya')
    await sock.groupParticipantsUpdate(m.chat, [users], 'add')
        .then((res) => {
            if (res[0].status == "408") {
                reply('Peserta tersebut telah keluar baru-baru ini');
            } else if (res[0].status == "403") {
                reply('Tidak dapat menambahkan peserta tersebut, mungkin di private');
            } else if(res[0].status == "200") {
                reply('Berhasil menambahkan peserta');
            } else {
                reply('Gagal menambahkan peserta')
                }
        })
        .catch((err) => {
            reply('Terjadi kesalahan saat menambahkan peserta');
        });
}
break;


                case 'promote': {
         	if (!m.isGroup) return reply("Hanya Dapat Di Gunakan Di Group")
         if (!isBotAdmins) return reply("Bot Bukan Admin")
         if (!isAdmins) return reply("Fitur Ini Hanya Dapat Di Gunakan Oleh Admin")
         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        if(!users) return reply('Tag/reply orangnya')
         await sock.groupParticipantsUpdate(m.chat, [users], 'promote')
         }
                break
                
                
                
                
         case 'demote': {
         	if (!m.isGroup) return reply("Hanya Dapat Di Gunakan Di Group")
         if (!isBotAdmins) return reply("Bot Bukan Admin")
         if (!isAdmins) return reply("Fitur Ini Hanya Dapat Di Gunakan Oleh Admin")
         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        if(!users) return reply('Tag/reply orangnya')
         await sock.groupParticipantsUpdate(m.chat, [users], 'demote')
         }
         break
			case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink':{
         	if (!m.isGroup) return reply(`Fitur Ini Khusus Group`)
         if (!isBotAdmins) return reply(`Bot Bukan Admin`)
         await loading()
         let response = await sock.groupInviteCode(m.chat)
         sock.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nGroup Link : ${groupMetadata.subject}`, m, { detectLink: true })
         }
         break
         
         
         
         
         case 'revoke':
         case 'resetlink':
         case 'resetlinkgrup':
         case 'resetlinkgroup':
         case 'resetlinkgc':{
         	if (!m.isGroup) return reply(`Fitur Ini Khusus Group`)
         if (!isBotAdmins) return reply(`Bot Bukan Admin`)
         if (!isAdmins && !isCreator) return reply(`Fitur Ini Khusus Admin !`)
         await loading()
         await sock.groupRevokeInvite(m.chat)
         reply(`Done Reset Link Gc Nya Kak`)
         }
         break
         
         
         
         
         case 'delete': case 'del':{
         	if (!m.quoted) reply('false')
             if(!isAdmins) return reply(`Khusus Admin!`)
         let { chat, fromMe, id, isBaileys } = m.quoted
         sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, participant: m.quoted.sender } })
         }
         break
         
         
         
         
                case 'group': case 'grup': {
		if (!m.isGroup) return reply('Fitur Khusus Group!')
		if (!isAdmins) return reply('Fitur Khusus admin!')
		if (!isBotAdmins) return reply("Jadikan bot sebagai admin terlebih dahulu")
		if (args[0] === 'close'){
			await sock.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`*Successfully Closed The Group*`)).catch((err) => m.reply(jsonformat(err)))
			} else if (args[0] === 'open'){
				await sock.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`*Successfully Opened The Group*`)).catch((err) => m.reply(jsonformat(err)))
				} else {
					reply(`Kirim perintah ${prefix + command} open/close\n\nContoh: ${prefix + command} open`)
					}
					}
					break
					
					
					
			default:
            if (isCmd) {
    let noPrefix = m.text.replace(prefix, '').trim();
    let args = noPrefix.trim().split` `.slice(1);
    let alias = await listcase();

    // Jika `noPrefix` ada di `alias`, langsung lanjutkan tanpa eksekusi tambahan
    if (alias.includes(noPrefix)) return
        let mean = didyoumean(noPrefix, alias);
        let sim = similarity(noPrefix, mean);
        let som = sim * 100;

        // Jika persentase 100%, jangan eksekusi logika berikutnya
        if (som === 100) return
        let tio = `ᴀᴘᴀᴋᴀʜ ᴋᴀᴍᴜ ᴍᴇɴᴄᴏʙᴀ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ᴄᴏᴍᴍᴀɴᴅ ʙᴇʀɪᴋᴜᴛ ɪɴɪ??

• ɴᴀᴍᴀ ᴄᴏᴍᴍᴀɴᴅ : *➠ ${prefix + mean}*
• ʜᴀꜱɪʟ ᴋᴇᴍɪʀɪᴘᴀɴ : *➠ ${parseInt(som)}%*`
            if (mean) {
            sock.sendButton(from, tio, namabot, `${prefix + mean}`, `${prefix + mean}`, m)
            }
}
				if (budy.startsWith('>')) {
					if (!isCreator) return
					try {
						let evaled = await eval(budy.slice(2))
						if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
						await reply(evaled)
					} catch (err) {
						await reply(util.format(err))
					}
				}
               if (budy.startsWith('$')) {
    if (!isCreator) return
      exec(budy.slice(2), (err, stdout) => {
      if(err) return reply(`${err}`)
      if (stdout) return reply(`${stdout}`)
                    })
                }
    if (/(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i.test(budy)) {
  return m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
_wa'alaikumussalam wr.wb._`)
}
		}

	} catch (err) {
		m.reply(util.format(err))
	}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})
