const {
MessageType,
Mimetype
} = require("@adiwajshing/baileys");
const fs = require('fs');
const connect = require('./connect');

const inky = connect.inky

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