const os = require('os');
const axios = require('axios');
const config = require('../settings');

module.exports = {
  name: "system",
  command: ["system", "sys", "status"],

  async execute({ socket, msg, sender }) {
    let shala;

    try {
      await socket.sendMessage(sender, {
        react: { text: "🖥️", key: msg.key }
      });

      const pushname = msg.pushName || "User";

      const ownerdata = (await axios.get(
        "https://raw.githubusercontent.com/DUM-324BY/HANSI-MD-DATABASE/refs/heads/main/alivedata.json"
      )).data;

      const {
        alivemsg,
        footer,
        imageurl,
        profileurl,
        alivevideo,
        version,
        jid,
        platform,
        jidname,
        botname,
        ownername,
        ownernumber,
        channel,
        pairlink,
        title
      } = ownerdata;
      
      const shala = {
      key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        fromMe: false,
        id: "META_AI_SYSTEM"
      },
      message: {
        contactMessage: {
           displayName: botname,
          vcard: `BEGIN:VCARD
VERSION:3.0
N:${botname};;;;
FN:${botname}
ORG:Meta Platforms
TEL;type=CELL;type=VOICE;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };


      // Uᴘᴛɪᴍᴇ
      const up = process.uptime();
      const h = Math.floor(up / 3600);
      const m = Math.floor((up % 3600) / 60);
      const s = Math.floor(up % 60);

      // Rᴀᴍ
      const totalMem = os.totalmem() / 1024 / 1024 / 1024;
      const freeMem = os.freemem() / 1024 / 1024 / 1024;
      const usedMem = totalMem - freeMem;
      const ramPercent = ((usedMem / totalMem) * 100).toFixed(1);

      // Cᴘᴜ
      const cpuModel = os.cpus()[0].model;
      const cores = os.cpus().length;

      // Pɪɴɢ
      const ping = msg.messageTimestamp
        ? Date.now() - msg.messageTimestamp * 1000
        : 'N/A';

      const systemMessage = `*🖥️ ${botname} Sʏꜱᴛᴇᴍ Iɴꜰᴏ 🖥️*

*╭───────────────●●✿◦*
*┊* \`🧬 Vᴇʀꜱɪᴏɴ\` : ${version || config.BOT_VERSION}
*┊* \`✒️ Pʀᴇꜰɪx\`  : ${config.PREFIX}
*┊* \`🌐 Hᴏꜱᴛ\`    : Hᴇʀᴏᴋᴜ
*┊*
*┊* \`🧠 Cᴘᴜ\`     : ${cpuModel}
*┊* \`🔢 Cᴏʀᴇꜱ\`   : ${cores}
*┊*
*┊* \`💾 Rᴀᴍ\`     : ${usedMem.toFixed(2)} / ${totalMem.toFixed(2)} GB
*┊* \`📊 Uꜱᴀɢᴇ\`   : ${ramPercent}%
*┊*
*┊* \`📟 Uᴘᴛɪᴍᴇ\`  : ${h}ʜ ${m}ᴍ ${s}ꜱ
*┊* \`⚡ Pɪɴɢ\`    : ${ping} ᴍꜱ
*┊*
*┊* \`🤖 Sᴛᴀᴛᴜꜱ\`  : 🟢 Oɴʟɪɴᴇ
*╰───────────────●●✿◦*

> *© Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍᴅ ʙᴇᴛᴀ ᴡᴀ ʙᴏᴛ 1.0.0 ᴘʀᴏ*
> *● ᴡᴀʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ ●*

> 🌐 Wᴇʙ : Cᴏᴍɪɴɢ Sᴏᴏɴ
> 🎬 Tᴜᴛᴏʀɪᴀʟ : Cᴏᴍɪɴɢ Sᴏᴏɴ`;

      const pingMsg = await socket.sendMessage(
        sender,
        { image: {url: imageurl},
          caption: systemMessage,
          footer: footer,
          buttons,
          headerType: 4,
           contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
 }, { quoted: shala });

      

    } catch (e) {
      console.error('system error:', e);
      await socket.sendMessage(
        sender,
        { text: '\`❌ Fᴀɪʟᴇᴅ ᴛᴏ ʟᴏᴀᴅ ꜱʏꜱᴛᴇᴍ ᴘᴀɴᴇʟ.\`' },
        { quoted: shala || msg }
      );
    }
  }
};