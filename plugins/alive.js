const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "alive",
  command: ["alive", "info", "online"],

  async execute({ socket, msg, sender, config }) {
    try {

  await socket.sendMessage(from, { react: { text: "🚀", key: msg } });
  
  let botName = "ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ", // මෙතනට ඔයාගෙ bot ගෙ නම දාගන්න
  botFooter = "> © ᴘᴏᴡᴇʀᴅ ʙʏ ᴛʜᴀʀᴜꜱʜᴀ-ᴍᴅ ⁱⁿᶜ", // මෙතනට ඔයාගෙ footer එක දාන්න
  botLogo = "", // මෙතනට ඔයාගෙ බොට්ගෙ image එකක direct url එකක් දාන්න
  ownerName = "Tharusha Sandipa", // මෙතනට ඔයාගෙ නම දාන්න
  ownerNumber = "94703802995"; // මෙතනට ඔයාගෙ whatsapp number එකක් දාන්න
  
  try {
    const date = moment().tz('Asia/Colombo').format('YYYY-MM-DD');
    const time = moment().tz('Asia/Colombo').format('HH:mm:ss');
    const hour = moment().tz('Asia/Colombo').format('HH');
    const minute = moment().tz('Asia/Colombo').format('mm');
    
    const dateEmoji = date.split('-').map(d =>
  d.replace(/0/g, '0️⃣').replace(/1/g, '1️⃣').replace(/2/g, '2️⃣').replace(/3/g, '3️⃣')
   .replace(/4/g, '4️⃣').replace(/5/g, '5️⃣').replace(/6/g, '6️⃣')
   .replace(/7/g, '7️⃣').replace(/8/g, '8️⃣').replace(/9/g, '9️⃣')).join('-');
    const timeEmoji = time.split(':').map(t =>
  t.replace(/0/g, '0️⃣').replace(/1/g, '1️⃣').replace(/2/g, '2️⃣').replace(/3/g, '3️⃣')
   .replace(/4/g, '4️⃣').replace(/5/g, '5️⃣').replace(/6/g, '6️⃣')
   .replace(/7/g, '7️⃣').replace(/8/g, '8️⃣').replace(/9/g, '9️⃣')).join(':');
    const time2 = moment().tz('Asia/Colombo').format('HH:mm:ss');
    
    let pushwish;
if (time2 < '06:00:00') pushwish = '`සුබ උදෑසනක්` 🌞';
else if (time2 < '12:00:00') pushwish = '`සුබ උදෑසනක්` 🌞';
else if (time2 < '15:00:00') pushwish = '`සුබ දහවලක්` ☀️';
else if (time2 < '18:00:00') pushwish = '`සුබ සන්ද්‍යාවක්` 🌄';
else pushwish = '`සුබ රාත්‍රියක්` 🌌';

    const runtime = (seconds) => {
	seconds = Number(seconds)
	var d = Math.floor(seconds / (3600 * 24))
	var h = Math.floor(seconds % (3600 * 24) / 3600)
	var m = Math.floor(seconds % 3600 / 60)
	var s = Math.floor(seconds % 60)
	var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

    const aliveTharusha = `*👋 Hellow there i'm \`${botName}\` mini whatsapp bot 🚀*\n\n` +
    `*╭──────────●●►*\n*│ 📅 \`𝐃𝐚𝐭𝐞:\` ${dateEmoji}*\n*│ ⏰ \`𝐓𝐢𝐦𝐞:\` ${timeEmoji}*\n*╰────────────●●►*\n\n` +
    `*╭──────────●●►*\n` +
    `*│ 🏞️ \`𝐆𝐫𝐞𝐞𝐭𝐢𝐧𝐠:\` ${pushwish}*\n` +
    `*│ 👾 \`𝐁𝐨𝐭 𝐧𝐚𝐦𝐞 :\` ${botName}*\n` +
    `*│ 📁 \`𝐌𝐞𝐦𝐨𝐫𝐲:\` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐦𝐛 / ${Math.round(require('os').totalmem / 1024 / 1024)}𝐦𝐛*\n` +
    `*│ 🕑 \`𝐑𝐮𝐧𝐭𝐢𝐦𝐞:\` ${runtime(process.uptime())}*\n` +
    `*╰────────────────●●►*\n\n` +
    `*I'm always availble for you 🫵😇*\n\n` +
    `🔢 *\`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:\`*\n\n` +
    `1 | | *ᴄᴏɴᴛᴀᴄᴛ ʙᴏᴛ ᴏᴡɴᴇʀ* 👤\n2 | | *ɢᴇᴛ ʙᴏᴛ ꜱᴘᴇᴇᴅ* 🚀\n\n` + botFooter;
    
    const alivemsg = await socket.sendMessage(from,{ image: { url: imagurl },caption: aliveTharusha },{ quoted: msg });
    
    socket.ev.on("messages.upsert", async (msgUpdate) => {
      const sandipamsg = msgUpdate.messages[0];
                if (!sandipamsg.message || !sandipamsg.message.extendedTextMessage) return;
      const selectedOption = sandipamsg.message.extendedTextMessage.text.trim();
      if (
            sandipamsg.message.extendedTextMessage.contextInfo &&
            sandipamsg.message.extendedTextMessage.contextInfo.stanzaId === alivemsg.key.id
           ) {
             await socket.sendMessage(from, { react: { text: "🧵", key: sandipamsg.key } });
             
             switch (selectedOption) {
               case '1':
                 const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';
                      
                  await conn.sendMessage(from, {
                      contacts: {
                        displayName: ownerName,
                        contacts: [{ vcard }]
                      }
                   });
                 break;
                 
                 case '2':
                   const start = new Date().getTime();
                   
                   const end = new Date().getTime();
                   const responseTime = (end - start) / 1000;
                   
                  await socket.sendMessage(from, {
                     text: `*📍 ρσηg : ${responseTime.toFixed(2)}мѕ*`
                   })
                   break;
                 
               default:
                 await socket.sendMessage(from,{text: "*❌ Please enter valid number (1,2).*" }, { quoted: sandipamsg });
             }
             await socket.sendMessage(from, { react: { text: "✅", key: sandipamsg.key } });
           }
    })
    
  } catch (e) {
    console.log("❌ Alive cmd error: " + e)
    return socket.sendMessage(from,{text: "❌ Alive cmd error: " + e }, { quoted: msg });
  }
  break;
};
