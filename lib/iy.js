const {
MessageType,
Mimetype
} = require("@adiwajshing/baileys");
const fs = require('fs');
const connect = require('./connect');

const inky = connect.inky

exports.reply = async(from, teks, botName, command, q) => {
await inky.sendMessage(from, teks, MessageType.text, { quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `👾${botName} | ThisIsInky👾\n${command} ${q}`,
'jpegThumbnail': fs.readFileSync('./media/image/reply.jpg')}}
},
sendEphemeral: true
})
}

exports.sendFakeStatus = async(from, text, botName, mentioned = []) => {
var options = {
contextInfo: {
participant: '0@s.whatsapp.net',
remoteJid: 'status@broadcast',
quotedMessage: {
imageMessage: {
caption: `👾${botName} | ThisIsInky👾`,
jpegThumbnail: fs.readFileSync('./media/image/reply.jpg')
}
},
mentionedJid: mentioned
}
}
await inky.sendMessage(from, text, MessageType.text, options)
}

exports.sendContact = async(from, numero, nombre, botName, fakeStatus) => {
const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nombre + '\n' + `ORG:Creador de ${botName}\n` + 'TEL;type=CELL;type=VOICE;waid=' + numero + ':+' + numero + '\n' + 'END:VCARD'
await inky.sendMessage(from, { displayname: nombre, vcard: vcard }, MessageType.contact, {quoted: fakeStatus, sendEphemeral: true})
}

exports.mentions = async(from, teks, memberr, id, fakeStatus) => {
(id == null || id == undefined || id == false) ? inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}}) : inky.sendMessage(from, teks.trim(), extendedText, {quoted: fakeStatus, sendEphemeral: true, contextInfo: {"mentionedJid": memberr}})
}
