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

      let menuc = `🌹⃝⃘̉̉̉̉̉̉🧚 *💘 ʜᴀɴꜱɪ ᴍᴅ ᴍɪɴɪ 💘*\n`;
      menuc += `━━━━◆◆◆◆◆\n`;
      menuc += `┊ ┊ ┊ ┊ ┊`;
      menuc += `┊ ┊ ✫ ˚♡ ⋆｡\n`;
      menuc += `┊ ☪︎⋆ ❀\n\n`;

      menuc += `☀️ ${greetings}\n`;
      menuc += `꒰ ˘͈ᵕ˘͈ ꒱ *ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴏᴜʀ ʙᴏᴛ* ~\n\n`;

        menuc += `╭─「 🕊️ *ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ* 」\n`;
        menuc += `│ ⏰ » 24ʜ 00ᴍ 00ꜱ\n`;
        menuc += `│ ⚡ » ʜᴇʀᴏᴋᴜ ʜᴏꜱᴛ\n`;
        menuc += `│ 🎭 » ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ\n`;
        menuc += `│ 💕 » ᴀʟᴡᴀʏꜱ ᴏɴʟɪɴᴇ ✿\n`;
        menuc += `│ 🔓 » ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ\n`;
        menuc += `╰──────────────────\n\n`;
        
        menuc += `╭─「 💕 *ᴅᴇᴠᴇʟᴏᴘᴇʀ* 」\n`;
        menuc += `│ 👨‍💻 » Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ\n`;
        menuc += `│ 🌟 » ɢᴘᴛ ᴅᴜᴍɪʏʜ ᴅᴇᴠ\n`;
        menuc += `╰──────────────────\n\n`;
        
        menuc += `┊ ┊ ✫ ˚♡ ⋆｡\n`;
        menuc += `┊ ☪︎⋆ ❀\n`;
		menuc += `> ᴘᴏᴡᴇʀᴅ ʙʏ Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍɪɴɪ`;
    

      const buttons = [
        { buttonId: `${config.PREFIX}mainmenu`, buttonText: { displayText: "MAIN MENU" }, type: 1 },
      ];

      await socket.sendMessage(
        sender,
        {
          image: { url: imageurl },
          caption: menuc,
          footer: footer,
          buttons,
          headerType: 4,
          contextInfo: { forwardingScore: 999, isForwarded: true }
        },
        { quoted: shala }
      );

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
