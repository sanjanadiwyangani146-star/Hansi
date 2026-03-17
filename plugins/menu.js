const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "menu",
  command: ["menu", "command", "cmd"],
  category: "main",

  async execute({ socket, msg, sender }) {
    try {
      await socket.sendMessage(sender, {
        react: {
          text: "📑",
          key: msg.key
        }
      });

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

      const pushname = msg.pushName || "User";

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

      const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
      const time = moment().tz("Asia/Colombo").format("HH:mm:ss");
      const hour = moment().tz("Asia/Colombo").hour();
      const greetings =
        hour < 12 ? '*`සුභ උදෑසනක් 🌄`*' :
        hour < 17 ? '*`සුභ දහවලක් 🏞️`*' :
        hour < 20 ? '*`සුභ හැන්දෑවක් 🌅`*' :
                    '*`සුභ රාත්‍රියක් 🌌`*';

      let menuc = `${greetings}
꒰ ˘͈ᵕ˘͈ ꒱ *ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴏᴜʀ ʙᴏᴛ* ~

*╭─「 🕊️ ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ 」*
*│ ⏰ » 24ʜ 00ᴍ 00ꜱ*
*│ ⚡ » ʜᴇʀᴏᴋᴜ ʜᴏꜱᴛ*
*│ 🎭 » ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ*
*│ 💕 » ᴀʟᴡᴀʏꜱ ᴏɴʟɪɴᴇ ✿*
*│ 🔓 » ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ*
*╰──────────────────*

*╭─「 💕 ᴅᴇᴠᴇʟᴏᴘᴇʀ 」*
*│ 👨‍💻 »* Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ
*│ 🌟 »* ɢᴘᴛ ᴅᴜᴍɪʏʜ ᴅᴇᴠ
*╰──────────────────*

*⭓───────────────⭓『 ⚡ ᴍᴀɪɴ  』*

*╭─「 ᴀʟɪᴠᴇ  」*
*│* ❄️ » ᴄʜᴇᴄᴋ ʙᴏᴛ ᴏɴʟɪɴᴇ
*│* 🌟 » ᴜꜱᴇ .ᴀʟɪᴠᴇ
*╰──────────────────*
*╭─「 ᴍᴇɴᴜ  」*
*│* ❄️ » ɢᴇᴛ ʙᴏᴛ ᴍᴇɴᴜ ʟɪꜱᴛ
*│* 🌟 » ᴜꜱᴇ .ᴍᴇɴᴜ
*╰──────────────────*
*╭─「 ꜱʏꜱᴛᴇᴍ  」*
*│* ❄️ » ᴄʜᴇᴄᴋ ʙᴏᴛ ꜱʏꜱᴛᴇᴍ ɪɴɢᴏ
*│* 🌟 » ᴜꜱᴇ .ꜱʏꜱᴛᴇᴍ
*╰──────────────────*
*╭─「 ᴏᴡɴᴇʀ  」*
*│* ❄️ » ɢᴇᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀꜱ ɴᴜᴍʙᴇʀ
*│* 🌟 » ᴜꜱᴇ .ᴏᴡɴᴇʀ
*╰──────────────────*
*╭─「 ᴘɪɴɢ  」*
*│* ❄️ » ᴄʜᴇᴄᴋ ʙᴏᴛ ʀᴇꜱᴘᴏɴᴅ ꜱᴘᴇᴇᴅ
*│* 🌟 » ᴜꜱᴇ .ᴘɪɴɢ
*╰──────────────────*
*╭─「 ɢᴇᴛᴅᴘ  」*
*│* ❄️ » ᴅᴏᴡɴʟᴏᴀᴅ ᴡᴀ. ᴘʀᴏꜰɪʟᴇ ᴘɪᴄᴛᴜʀᴇ 
*│* 🌟 » ᴜꜱᴇ .ɢᴇᴛᴅᴘ
*╰──────────────────*

> *© Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍᴅ ʙᴇᴛᴀ ᴡᴀ ʙᴏᴛ 1.0.0 ᴘʀᴏ*
> *● ᴡᴀʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ ●*

> 🌐 Wᴇʙ : Cᴏᴍɪɴɢ Sᴏᴏɴ
> 🎬 Tᴜᴛᴏʀɪᴀʟ : Cᴏᴍɪɴɢ Sᴏᴏɴ`

      await socket.sendMessage(
        sender,
        {
          image: { url: imageurl },
          caption: menuc,
          footer: footer,
          headerType: 4,
          contextInfo: { forwardingScore: 999, isForwarded: true }
        },
        { quoted: shala }
      );

      await socket.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/e3zmey.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
      console.error('System error:', e);
      await socket.sendMessage(
        sender,
        { text: '❌ Fᴀɪʟᴇᴅ ᴛᴏ ʟᴏᴀᴅ ᴍᴇɴᴜ' },
        { quoted: msg }
      );
    }
  }
};
