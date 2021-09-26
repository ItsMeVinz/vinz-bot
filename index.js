const {
WAConnection,
MessageType,
Presence,
Mimetype,
GroupSettingChange
} = require('@adiwajshing/baileys')
const { addCmd, getCommandPosition, getCmd, checkSCommand } = require('./lib/cmdstik')
const { getRegisteredRandomId, addRegisteredUser, createSerial, checkRegisteredUser} = require('./lib/register')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const fs = require('fs')
const crypto = require('crypto')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const figlet = require('figlet')
const ffmpeg = require('fluent-ffmpeg')
const yts = require('yt-search')
const request = require('request')
const brainly = require('brainly-scraper')
const { removeBackgroundFromImageFile } = require('remove.bg')


multi = false
nopref = true
vn = true
ngetik = false
prefa = '-'
pixz = fs.readFileSync('./src/vinz.jpg')
blocked = []

let _scommand = JSON.parse(fs.readFileSync('./src/database/scommand.json'))
let _registered = JSON.parse(fs.readFileSync('./src/database/register.json'))

const col = ['red','white','black','blue','yellow','green']
const warna = col[Math.floor(Math.random() * (col.length))]
function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);

//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
client = new WAConnection()
client.logger.level = 'warn'
console.log(color(figlet.textSync('PIXZ-BOT', {font: 'Standard',horizontalLayout: 'default',vertivalLayout: 'default',whitespaceBreak: false}), warna,))
console.log(color('[ BASE BY ADITYANUROSYID ]'))
client.on('qr', qr => {
qrcode.generate(qr, { small: true })
console.log(color('Scan QR ~~'))
})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.on('connecting', () => {
console.log(color('Connecting...'))
})
client.on('open', (json) => {
console.log(color('Connect...'))
})
client.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
client.on('ws-close', () => {
console.log(color('Connection lost, trying to reconnect..'))
})
client.on('close', async ({ reason, isReconnecting }) => {
console.log(color('Disconnected, Reason :' + reason + '\nTrying to reconnect :' + isReconnecting))
if (!isReconnecting) {
console.log(color('Connect To Phone Rejected and Shutting Down.'))
}
})

client.on('group-participants-update', async (anu) => {
try {
if (anu.participants[0] === client.user.jid){
client.updatePresence(anu.jid, Presence.composing)
client.sendMessage(anu.jid, `Hai, Aku VinzBot. Ketik menu Untuk Menampilkan Menu Yang Ada Di Dalam List Menu `, MessageType.text)
}
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const mdata = await client.groupMetadata(anu.jid)
console.log(anu)
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
tek = `Hello @${num.split('@')[0]}\nWelcome to the group *${mdata.subject}*`
gambar = await getBuffer(ppimg)
mhan = await client.prepareMessage(mdata.id, gambar, image, {thumbnail: gambar})
gbutsan = [{buttonId: 'y', buttonText: {displayText: 'Hello New Member'}, type: 1},{buttonId: `a`, buttonText: {displayText: 'Enjoy'}, type: 1}]
gbuttonan = {imageMessage: mhan.message.imageMessage,contentText: tek,footerText: `Halo Member baru`,buttons: gbutsan,headerType: 4}
await client.sendMessage(mdata.id, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('./src/vinz.jpg'),caption: tek,'contextInfo': {mentionedJid: [num]}})
}
if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
tek = `Sayonara @${num.split('@')[0]}Jan Balik Lagi Ye Di Grup *${mdata.subject}* Kwkwkw`
gambar = await getBuffer(ppimg)
mhan = await client.prepareMessage(mdata.id, gambar, image, {thumbnail: gambar})
gbutsan = [{buttonId: 'y', buttonText: {displayText: 'Beban Grup'}, type: 1},{buttonId: 'y', buttonText: {displayText: 'Yah Si Wibu Keluar'}, type: 1}]
gbuttonan = {imageMessage: mhan.message.imageMessage,contentText: tek,footerText: `Halo Member baru`,buttons: gbutsan,headerType: 4}
await client.sendMessage(mdata.id, gbuttonan, MessageType.buttonsMessage, {caption: tek,'contextInfo': {mentionedJid: [num]}})
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
client.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))
}
})

client.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (mek.key.fromMe) return
global.prefix
global.blocked
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const itsMe = mek.key.fromMe ? true : false
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const type = Object.keys(mek.message)[0]
const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
if (multi){
var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#$%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#$,|`÷?;:%abcdefghijklmnopqrstuvwxyz%^&./\\©^]/gi) : '-'
} else {
if (nopref){
prefix = ''
} else {
prefix = prefa
}}
if (vn) {
client.updatePresence(from, Presence.recording)
} else if (ngetik) {
client.updatePresence(from, Presence.composing)
}
body= (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(mek.message[type].fileSha256.toString('base64')) !== null && getCmd(mek.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message[type].fileSha256.toString('base64')) : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const commando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)
const q = args.join(' ')
const botNumber = client.user.jid
const botNumberss = client.user.jid + '@c.us'
const isGroup = from.endsWith('@g.us')
let sender = isGroup ? mek.participant : mek.key.remoteJid
const totalchat = await client.chats.all()
const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || true
const isGroupAdmins = groupAdmins.includes(sender) || true
const ownerNumber = ['6282189387018@s.whatsapp.net']
const isOwner = ownerNumber.includes(sender)
const isRegister = checkRegisteredUser(sender)
const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
//MESS
mess = {
wait: 'Wait a moment in process',
success: 'Succeed!',
wrongFormat: 'Wrong format, try again in the menu',
error: {
stick: 'Sorry, it looks like its not a sticker:v',
Iv: 'Error:v Linknya'
},
only: {
group: 'Group only ngab',
}
}

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if (time2 < '23:59:00'){
var ucapanWaktu = 'Selamat Malam'
}
if (time2 < '19:00:00'){
var ucapanWaktu = 'Selamat Petang'
}
if (time2 < '18:00:00'){
var ucapanWaktu = 'Selamat Sore'
}
if (time2 < '15:00:00'){
var ucapanWaktu = 'Selamat Siang'
}
if (time2 < '11:00:00'){
var ucapanWaktu = 'Selamat Pagi'
}
if (time2 < '05:00:00'){
var ucapanWaktu = 'Selamat Malam'
}

const ftrol = {
key : {
participant : '0@s.whatsapp.net'
},
message: {
orderMessage: {
itemCount : 123,
status: 1,
surface : 1,
message: `${ucapanWaktu} ${pushname}`,
orderTitle: `${ucapanWaktu} ${pushname}`,
thumbnail: pixz,
sellerJid: '0@s.whatsapp.net' 
}
}
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
const sendMess = (hehe, teks) => {
client.sendMessage(hehe, teks, text)
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {'mentionedJid': memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {'mentionedJid': memberr}})
}
const reply = (teks) => {
client.sendMessage(from, teks, text,{ contextInfo :{text: 'hi','forwardingScore': 1000000000,isForwarded: false,sendEphemeral: false,'externalAdReply': {'title': `VINZBOT`,'body': '','previewType': 'PHOTO','thumbnailUrl': 'https://i.ibb.co/kX75hbc/vinz.jpg','thumbnail': pixz,'sourceUrl': ``}, mentionedJid:[sender]}, quoted : ftrol})
}
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {const buttonMessage = {contentText: text1,footerText: desc1,buttons: but,headerType: 1
}
client.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
}
const fakestatus = (teks) => {
client.sendMessage(from, teks, text, {
quoted: {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: 'status@broadcast' } : {})
},
message: {
'imageMessage': {
'url': 'https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc',
'mimetype': 'image/jpeg',
'caption': 'PIXZBOT',
'fileSha256': '+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=',
'fileLength': '28777',
'height': 1080,
'width': 1079,
'mediaKey': 'vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=',
'fileEncSha256': 'sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=',
'directPath': '/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69',
'mediaKeyTimestamp': '1610993486',
'jpegThumbnail': pixz,
'scansSidecar': '1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=='
}
}
}
})
}
const katalog = (teks) => {
res = client.prepareMessageFromContent(from,{ 'orderMessage': { 'itemCount': 321, 'message': teks, 'footerText': 'PIXZBOT', 'thumbnail': pixz, 'surface': 'CATALOG' }}, {quoted:ftrol})
client.relayWAMessage(res)
}
const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
client.sendMessage(to, media, type, { quoted: ftrol, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})

fs.unlinkSync(filename)
});
}
const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link).catch(e => {
fetch(link).then((hasil) => {
return client.sendMessage(from, hasil, type, options)
}).catch(e => {
client.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
}) 
}) 
})
client.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
client.sendMessage(from, hasil, type, options).catch(e => {
client.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
})
})
})
})
}

colors = ['red','white','black','blue','yellow','green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
if (isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color('[ EXEC ]'), color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName))
if (!isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color('[ EXEC ]'), color(command), 'from', color(sender.split('@')[0]))

switch(command) {
case 'help':
case 'menu':
case 'start':
if (!isRegister) return reply(`Kamu Belum Verify Ketik ${prefix}verify`)
txtt =`Hai Kak ${pushname}\nPilih Opsi Dibawah Ini Ya.. `
buttons = [{buttonId:`${prefix}menu2`, buttonText:{displayText: 'MENU📓'},type:1}]
imageMsg = (await client.prepareMessageMedia(fs.readFileSync(`./src/vinz.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/vinz.jpg`)})).imageMessage
buttonsMessage = {contentText: `${txtt}`,footerText: ' © Creator Vinz', imageMessage: imageMsg,buttons: buttons,headerType: 4}
prep = await client.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
client.relayWAMessage(prep)
break
case 'menu2':
teks =`
Hi @${sender.split('@')[0]}


「 *OWNER* 」
• _${prefix}setprefix_
• _${prefix}setbug_
• _${prefix}addcmd_
• _${prefix}delcmd_
• _${prefix}listcmd_

「 *OTHER* 」
• _${prefix}brainly_

「 *PHOTOXY* 」
• _${prefix}manga-naruto_
• _${prefix}flaming-fire_
• _${prefix}metalic-gold_
• _${prefix}shadow-sky_
• _${prefix}teks-cup_
• _${prefix}romantic-messages_
• _${prefix}burn-paper_
• _${prefix}funny-cup_
• _${prefix}love-messages_
• _${prefix}under-grass_
• _${prefix}romantic-double_
• _${prefix}coffee-cup_
• _${prefix}wood-hearth_


📓:\nNOT ALL FEATURES WORK\nTHERE IS AN ERROR
`
let tod = fs.readFileSync('./src/vinz.jpg')
let ownerBot = `6282189387018@s.whatsapp.net`
client.sendMessage(from, { contentText: teks, footerText: `VINZBOT BY @${ownerBot.split('@')[0]}`, buttons: [{ buttonId: `${prefix}owner`, buttonText: { displayText: 'OWNER' }, type: 1 }], headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: tod, contextInfo: {mentionedJid: [sender]}}}, 'buttonsMessage')
break
case 'setprefix':
if (!isOwner) return reply('Khusus Owner')
fg = args.join(' ')
if (args[0] == 'multi') {
multi = true
reply(`Berhasil mengubah prefix ke ${fg}`)
} else if (args[0] == 'nopref') {
multi = false
nopref = true
reply(`Berhasil mengubah prefix ke ${fg}`)
} else if (!fg) {
sendButMessage(from,`MODE SET PREFIX!`,`Silahkan pilih salah satu`,[{buttonId: `setprefix multi`,buttonText: {displayText: `multi`,},type: 1,},{buttonId: `setprefix nopref`,buttonText: {displayText: `no prefix`,},type: 1,},])}
break
case 'setbug':
if (!itsMe && !isOwner) return reply(`*Perintah ini Khusus owner*`)
if (args.length < 1) return reply('bukan gitu\n\nada dua pilihan\nvn\nngetik\n\ncontoh: !setbug ngetik')
if((args[0]) == 'vn'){
ngetik = false
vn = true
if(ngetik) return reply('_Sudah diaktifkan sebelumnya!_')
reply(`_Succses mengganti ke vn`)
} else
if ((args[0]) == 'ngetik'){
ngetik = true
vn = false
if(vn)return reply('_Sudah diaktifkan sebelumnya!_')
reply(`_Succses mengganti ngetik`)
}
break
case 'brainly':
if (!isRegister) return reply(`Kamu Belum Verify Ketik ${prefix}verify`)
if (args.length < 1) return reply('Pertanyaan apa')
brien = args.join(' ')
brainly(`${brien}`).then((res) => {
teks = '❉───────────────────────❉\n'
for (let Y of res.data) {
teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉──────────────────❉\n`
}
client.sendMessage(from, teks, text, {quoted: mek,detectLinks: false,})
})
break
case 'manga-naruto':
case 'flaming-fire':
case 'metalic-gold':
case 'shadow-sky':
case 'teks-cup':
case 'romantic-messages':
case 'burn-paper':
case 'funny-cup':
case 'love-messages':
case 'under-grass':
case 'romantic-double':
case 'coffee-cup':
case 'wood-hearth':
if (!isRegister) return reply(`Kamu Belum Verify Ketik ${prefix}verify`)
if (args.length < 1) return reply('Teksnya mana')
teks = body.split(' ')
a = await getBuffer(`https://hadi-api.herokuapp.com/api/photoxy/${command}?teks=${teks}`)
client.sendMessage(from, a, image, { qouted : mek, caption: 'Nih' })
break
case 'addcmd': 
case 'setcmd':
case 'z':
if(!q) return reply('contoh .addcmd query')
if (!itsMe && !isOwner)return reply('Khusus Owner')
if (isQuotedSticker) {
if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, q)
ffff = `SUCCES ADD KEY:\n${kodenya}\n${q}`
reply(ffff)
} else {
reply('tag stickenya')
}
break
case 'delcmd':
if (!itsMe && !isOwner)return reply('Khusus Owner')
if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
_scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./src/database/scommand.json', JSON.stringify(_scommand))
fft = `DONE DELETE KEY:\n${kodenya}`
reply(fft)
break
case 'listcmd':
if (!itsMe && !isOwner)return
let teksnyee = `\`\`\` LIST STICKER CMD \`\`\``
let cemde = []
for (let i of _scommand) {
cemde.push(i.id)
teksnyee += `\n\n*ID :* ${i.id}\n*Cmd* : ${i.chats}`
}
mentions(teksnyee, cemde, true)
break
case 'play':
case 'ytdl':
if (!isRegister) return reply(`Kamu Belum Verify Ketik ${prefix}verify`)
reply(mess.wait)
if (!q) return reply(`Example : ${prefix + command} dj tutu 30 detik`)
res = await yts(q).catch(e => {
reply('_[ ! ] Error Yang Anda Masukan Tidak Ada_')
})
let thumbInfo = `*Youtube Play▶️*

📜 Judul : ${res.all[0].title}
📬 ID : ${res.all[0].videoId}
🌐 Publikasi : ${res.all[0].ago}
🎞️ Ditonton : ${res.all[0].views}
⚖️ Durasi : ${res.all[0].timestamp}
🎥 Channel : ${res.all[0].author.name}
🖇️ Link : ${res.all[0].author.url}`

buttons = [{buttonId:`${prefix}buttonvideo ${res.all[0].url}`,buttonText:{displayText:'🎥VIDEO'},type:1},{buttonId:`${prefix}buttonmusic ${res.all[0].url}`,buttonText:{displayText:'🎵AUDIO'},type:1}]
imageMessage = (await client.prepareMessageMedia({url:res.all[0].image},'imageMessage',{thumbnail:Buffer.alloc(0)})).imageMessage
buttonsMessage = {contentText: thumbInfo,footerText:'Silahkan Pilih Jenis File Dibawah Ini',imageMessage,buttons,headerType:4}
vinza = await client.prepareMessageFromContent(from,{buttonsMessage},{})
client.relayWAMessage(vinza)
break
case 'buttonmusic':
if(!q) return reply('linknya?')
res = await yta(`${q}`).catch(e => {
reply('_[ ! ] Error Saat Mengirim Video_')
})
filesize = res
if (Number(filesize) >= 100000) return reply('File Melebihi Dari 100 MB!')
sendMediaURL(from, `${res.dl_link}`,'nih kak')
break
case 'buttonvideo':
if(!q) return reply('linknya?')
res = await ytv(`${q}`).catch(e => {
reply('_[ ! ] Error Saat Mengirim Video_')
})
filesize = res
if (Number(filesize) >= 100000) return reply('File Melebihi Dari 100 MB!')
sendMediaURL(from, `${res.dl_link}`,'nih kak')
break
case 'verify':
case 'daftar':
case 'register':
if (isRegister) return reply('Akun kamu sudah terverfikasi')
const namaUser = `${pushname}`
const serialUser = createSerial(20)
veri = sender
if (isGroup) {
addRegisteredUser(sender, namaUser, time, serialUser)
hasil = `「 *VERIFY* 」\n\n*SERIAL* : *${serialUser}*\n*NAME* : *${namaUser}*\n*TIME* : *${time}*\n*NUMBER* : *${sender.split("@")[0]}*`
reply(hasil)
console.log(color('[REGISTER]'), color(time, 'yellow'), 'NAME:', color(namaUser, 'cyan'), 'SERIAL:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
} else {
addRegisteredUser(sender, namaUser, time, serialUser)
hasil = `「 *VERIFY* 」\n\n*SERIAL* : *${serialUser}*\n*NAME* : *${namaUser}*\n*TIME* : *${time}*\n*NUMBER* : *${sender.split("@")[0]}*`
reply(hasil)
console.log(color('[REGISTER]'), color(time, 'yellow'), 'NAME:', color(namaUser, 'cyan'), 'SERIAL:', color(serialUser, 'cyan'))
}
tm = `verifikasi selesai silahkan ketik ${prefix}Menu untuk menampilkan list menu`
reply(tm)
break
default:
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
}
starts()
