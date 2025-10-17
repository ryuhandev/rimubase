require('./settings')
const {
	default: WADefault,
   useMultiFileAuthState,
   DisconnectReason,
   generateForwardMessageContent,
   prepareWAMessageMedia,
   generateWAMessageFromContent,
   generateMessageID,
   downloadContentFromMessage,
   proto,
   makeInMemoryStore,
   jidDecode,
   makeCacheableSignalKeyStore,
   jidNormalizedUser,
   delay,
   WAMessageKey,
   WAMessageContent,
   AnyMessageContent,
   PHONENUMBER_MCC,
   makeWALegacySocket,
   areJidsSameUser,
   WAMessageStubType,
   fetchLatestWaWebVersion
} = require("@whiskeysockets/baileys")
const pino = require('pino')
const {
	Boom
} = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const axios = require('axios')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const moment = require('moment-timezone')
const path = require('path')
const figlet = require("figlet");
const NodeCache = require("node-cache")
const readline = require("readline");
const usePairingCode = !process.argv.includes('--use-pairing-code')
const {
	getSizeMedia
} = require('./lib/myfunc')
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('./lib/exif')
const {
	smsg,
	getBuffer,
	fetchJson
} = require('./lib/simple')
const {
	writeExif
} = require('./lib/exif')





const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const color = (text, color) => {
	return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
})
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
	} : {})
})) : '')

async function Botstarted() {
    const { state, saveCreds } = await useMultiFileAuthState(`./${sessionName}`)
    const { version, isLatest } = await fetchLatestWaWebVersion();
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
    console.log(
    color(
    figlet.textSync("RIMURU-X", {
    	font: "Standard",
    horizontalLayout: "default",
    vertivalLayout: "default",
    whitespaceBreak: false,
    }),
    "yellow"
    )
    );

const sock = WADefault({
	logger: pino({ level: 'silent' }),
	printQRInTerminal: !usePairingCode,
	auth: state,
	version,
	version: [2, 3000, 1023223821],
	connectTimeoutMs: 60000,
	defaultQueryTimeoutMs: 0,
	keepAliveIntervalMs: 10000,
	emitOwnEvents: true,
	fireInitQueries: true,
	generateHighQualityLinkPreview: true,
	markOnlineOnConnect: true,
	getMessage: async key => {
		const messageData = await store.loadMessage(key.remoteJid, key.id);
		return messageData?.message || undefined;
	},
	syncFullHistory: false,
	downloadHistory: false,
	msgRetryCounterCache, // Resolve waiting messages
	defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
})
patchMessageBeforeSending: (message) => {
	const requiresPatch = !!(
	message.buttonsMessage
	|| message.templateMessage
	|| message.listMessage
	);
	if (requiresPatch) {
		message = {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadataVersion: 2,
						deviceListMetadata: {},
						},
						...message,
						},
					},
				};
			}
		return message;
		var groupMetadataCache = new Map()
	}
	
	if (usePairingCode && !sock.authState.creds.registered) {
		const phoneNumber = await question(color('\n\n\nPlease enter your number (e.g., 628xxxxx):\n', 'yellow'));
		console.log(chalk.bgWhite(chalk.blue('Generating code...')));
		console.log(chalk.bgWhite(chalk.red('Please wait for 3 seconds...')));
		
		setTimeout(async () => {
			try {
				let code = await sock.requestPairingCode(phoneNumber);
				code = code?.match(/.{1,4}/g)?.join("-") || code;
				console.log(`Your Pairing Code: ${code}`);
			} catch (error) {
				console.error(chalk.bgRed(chalk.white('Error generating pairing code:')), error);
		}
	}, 3000);
}

	store.bind(sock.ev)

	sock.ev.on('messages.upsert', async chatUpdate => {
		//console.log(JSON.stringify(chatUpdate, undefined, 2))
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
			if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 16) return
			m = smsg(sock, mek, store)
			require("./sock")(sock, m, chatUpdate, store)
		} catch (err) {
			console.log(err)
		}
	})
	
	sock.ev.on('call', async (celled) => {
		if (global.anticall) {
			console.log(celled)
			for (let kopel of celled) {
				if (kopel.isGroup == false) {
					if (kopel.status == "offer") {
						let nomer = await sock.sendTextWithMentions(kopel.from, `*${sock.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
						sock.sendContact(kopel.from, owner, nomer)
						await sleep(5000)
						sock.updateBlockStatus(kopel.from, "block")
					}
				}
			}
		}
	})

	sock.ev.on('group-participants.update', async (anu) => {
        let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

let _left = JSON.parse(fs.readFileSync('./database/left.json'));
		const isWelcome = _welcome.includes(anu.id)
		const isLeft = _left.includes(anu.id)
		try {
			let metadata = await sock.groupMetadata(anu.id)
			let participants = anu.participants
			const groupName = metadata.subject
			const groupDesc = metadata.desc
			for (let num of participants) {
				try {
					ppuser = await sock.profilePictureUrl(num, 'image')
				} catch {
					ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
				}

				try {
					ppgroup = await sock.profilePictureUrl(anu.id, 'image')
				} catch {
					ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
				}
				if (anu.action == 'add' && (isWelcome || global.welcome)) {
					console.log(anu)
					if (isSetWelcome(anu.id, set_welcome_db)) {
						var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
						var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`))
						var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
						sock.sendMessage(anu.id, {
							text: `${full_pesan}`
						})
					} else {
						sock.sendMessage(anu.id, {
							image: {
								url: ppuser
							},
							mentions: [num],
							caption: `*Welcome Kak @${num.split("@")[0]} Di Group ${metadata.subject}* 

${metadata.desc} `
						})
					}
				} else if (anu.action == 'remove' && (isLeft || global.left)) {
					console.log(anu)
					if (isSetLeft(anu.id, set_left_db)) {
						var get_teks_left = await getTextSetLeft(anu.id, set_left_db)
						var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`))
						var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
						sock.sendMessage(anu.id, {
							text: `${full_pesan}`
						})
					} else {
						sock.sendMessage(anu.id, {
							image: {
								url: ppuser
							},
							mentions: [num],
							caption: `Bye Kak 👋
                       	
*"Karna Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal"*

Terima Kasih Kak @${num.split("@")[0]} Sampai Bertemu Kembali Di Group ${metadata.subject}`
						})
					}
				} else if (anu.action == 'promote') {
                    sock.sendMessage(anu.id, { text: `@${num.split('@')[0]} sekarang menjadi admin grup ${metadata.subject}`, mentions: [num]})
				} else if (anu.action == 'demote') {
                    sock.sendMessage(anu.id, { text: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi`, mentions: [num] })
				}
			}
		} catch (err) {
			console.log(err)
		}
	})

	// Setting
	sock.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	sock.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = sock.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	sock.getName = (jid, withoutContact = false) => {
		id = sock.decodeJid(jid)
		withoutContact = sock.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = sock.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
				id,
				name: 'WhatsApp'
			} : id === sock.decodeJid(sock.user.id) ?
			sock.user :
			(store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	sock.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await sock.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await sock.getName(i + '@s.whatsapp.net')}\nFN:${await sock.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
			})
		}
		sock.sendMessage(jid, {
			contacts: {
				displayName: `${list.length} Kontak`,
				contacts: list
			},
			...opts
		}, {
			quoted
		})
	}

	sock.public = true

	sock.serializeM = (m) => smsg(sock, m, store)

	sock.ev.on('connection.update', async (update) => {
		const {
			connection,
			lastDisconnect
		} = update
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				sock.logout();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				Botstarted();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				Botstarted();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, reconnecting...");
				Botstarted();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				sock.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				Botstarted();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				Botstarted();
			} else if (reason === DisconnectReason.Multidevicemismatch) {
				console.log("Multi device mismatch, please scan again");
				sock.logout();
			} else sock.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			await store.chats.all()
			console.log(`Connected to = ` + JSON.stringify(sock.user, null, 2))
			//sock.sendMessage("77777777777" + "@s.whatsapp.net", {text:"", "contextInfo":{"expiration": 86400}})
		}
	})

	sock.ev.on('creds.update', saveCreds)

    //BUTTON IMAGE
    
    sock.sendButtonImg = async (jid, path, content, footer, button1, row1, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        }
    ];
    await sock.sendMessage(jid, {
        image: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    sock.send2ButtonImg = async (jid, path, content, footer, button1, row1, button2, row2, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        }
    ];
    await sock.sendMessage(jid, {
        image: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
    sock.send3ButtonImg = async (jid, path, content, footer, button1, row1, button2, row2, button3, row3, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        },
        {
            buttonId: row3,
            buttonText: {
                displayText: button3
            }
        }
    ];
    await sock.sendMessage(jid, {
        image: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
    //BUTTON VIDEO
    
    sock.sendButtonVid = async (jid, path, content, footer, button1, row1, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        }
    ];
    await sock.sendMessage(jid, {
        video: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
    
    
    sock.send2ButtonVid = async (jid, path, content, footer, button1, row1, button2, row2, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        }
    ];
    await sock.sendMessage(jid, {
        video: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
    sock.send3ButtonVid = async (jid, path, content, footer, button1, row1, button2, row2, button3, row3, quoted = '', opts = {}) => {
        const media = await sock.getFile(path)
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        },
        {
            buttonId: row3,
            buttonText: {
                displayText: button3
            }
        }
    ];
    await sock.sendMessage(jid, {
        video: media.data,
        caption: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
    sock.sendButton = async (jid, content, footer, button1, row1, quoted = '', opts = {}) => {
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        }
    ];
    await sock.sendMessage(jid, {
        text: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};

sock.send2Button = async (jid, content, footer, button1, row1, button2, row2, quoted = '', opts = {}) => {
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        }
    ];
    await sock.sendMessage(jid, {
        text: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};

sock.send3Button = async (jid, content, footer, button1, row1, button2, row2, button3, row3, quoted = '', opts = {}) => {
    const buttons = [
        {
            buttonId: row1,
            buttonText: {
                displayText: button1
            }
        },
        {
            buttonId: row2,
            buttonText: {
                displayText: button2
            }
        },
        {
            buttonId: row3,
            buttonText: {
                displayText: button3
            }
        }
    ];
    await sock.sendMessage(jid, {
        text: content,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6,
        ...opts
    }, { quoted });
};
    
	sock.sendText = (jid, text, quoted = '', options) => sock.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted,
		...options
	})

  sock.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await sock.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }
    
	sock.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}

	sock.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {

		let quoted = message.msg ? message.msg : message

		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
		// save to file
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}
	sock.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await sock.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}
	sock.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await sock.getFile(path, true)
		let {
			mime,
			ext,
			res,
			data,
			filename
		} = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			} catch (e) {
				if (e.json) throw e.json
			}
		}
		let type = '',
			mimetype = mime,
			pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let {
				writeExif
			} = require('./lib/exif')
			let media = {
				mimetype: mime,
				data
			}
			pathFile = await writeExif(media, {
				packname: options.packname ? options.packname : global.packname,
				author: options.author ? options.author : global.author,
				categories: options.categories ? options.categories : []
			})
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		} else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await sock.sendMessage(jid, {
			[type]: {
				url: pathFile
			},
			caption,
			mimetype,
			fileName,
			...options
		}, {
			quoted,
			...options
		})
		return fs.promises.unlink(pathFile)
	}

	sock.getFile = async (PATH, returnAsFilename) => {
		let res, filename
		const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		const type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './media/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
		return {
			res,
			filename,
			...type,
			data,
			deleteFile() {
				return filename && fs.promises.unlink(filename)
			}
		}
	}

	sock.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}

		await sock.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}
	sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}

		await sock.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	sock.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
		let {
			ext,
			mime,
			data
		} = await sock.getFile(path)
		let media = {}
		let buffer
		media.data = data
		media.mimetype = mime
		if (options && (options.packname || options.author)) {
			buffer = await writeExif(media, options)
		} else {
			buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
		}
		await sock.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	sock.sendFakeLink = (jid, text, salam, pushname, quoted) => sock.sendMessage(jid, {
		text: text,
		contextInfo: {
			"externalAdReply": {
				"title": `Selamat ${salam} ${pushname}`,
				"body": `© ${namaowner}`,
				"previewType": "PHOTO",
				"thumbnailUrl": ``,
				"thumbnail": pp_bot,
				"sourceUrl": 'tes'
			}
		}
	}, {
		quoted: quoted
	})

	sock.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
		let type = await sock.getFile(path, true)
		let {
			res,
			data: file,
			filename: pathFile
		} = type
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			} catch (e) {
				if (e.json) throw e.json
			}
		}
		let opt = {
			filename
		}
		if (quoted) opt.quoted = quoted
		if (!type) options.asDocument = true
		let mtype = '',
			mimetype = type.mime,
			convert
		if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
		else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
		else if (/video/.test(type.mime)) mtype = 'video'
		else if (/audio/.test(type.mime))(
			convert = await (ptt ? toPTT : toAudio)(file, type.ext),
			file = convert.data,
			pathFile = convert.filename,
			mtype = 'audio',
			mimetype = 'audio/ogg; codecs=opus'
		)
		else mtype = 'document'
		if (options.asDocument) mtype = 'document'

		delete options.asSticker
		delete options.asLocation
		delete options.asVideo
		delete options.asDocument
		delete options.asImage

		let message = {
			...options,
			caption,
			ptt,
			[mtype]: {
				url: pathFile
			},
			mimetype
		}
		let m
		try {
			m = await sock.sendMessage(jid, message, {
				...opt,
				...options
			})
		} catch (e) {
			//console.error(e)
			m = null
		} finally {
			if (!m) m = await sock.sendMessage(jid, {
				...message,
				[mtype]: file
			}, {
				...opt,
				...options
			})
			file = null
			return m
		}
	}

	sock.sendTextWithMentions = async (jid, text, quoted, options = {}) => sock.sendMessage(jid, {
		text: text,
		mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
		...options
	}, {
		quoted
	})

	return sock
}

Botstarted()
