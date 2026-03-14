const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "alive",
  command: ["alive", "info", "online"],

  async execute({ socket, msg, sender }) {

    const shala = {
      key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        fromMe: false,
        id: "META_AI_SYSTEM"
      },
      message: {
        contactMessage: {
          displayName: "Qᴜᴇᴇɴ ʜᴀɴꜱɪ",
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Qᴜᴇᴇɴ ʜᴀɴꜱɪ;;;;
FN:Qᴜᴇᴇɴ ʜᴀɴꜱɪ
ORG:Meta Platforms
TEL;type=CELL;type=VOICE;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };

    try {

      await socket.sendMessage(sender, {
        react: { text: "🕊️", key: msg.key }
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
        jid,
        jidname,
        botname,
        ownername,
        channel,
        pairlink,
        title
      } = ownerdata;

      const pushname = msg.pushName || "User";

      const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
      const time = moment().tz("Asia/Colombo").format("HH:mm:ss");

      const hour = moment().tz("Asia/Colombo").hour();
      const greetings =
        hour < 12 ? '*`සුභ උදෑසනක් 🌄`*' :
        hour < 17 ? '*`සුභ දහවලක් 🏞️`*' :
        hour < 20 ? '*`සුභ හැන්දෑවක් 🌅`*' :
                    '*`සුභ රාත්‍රියක් 🌌`*';

      const aliveMessage = `_*Ｗᴇʟᴄᴏᴍᴇ Ｔᴏ Qᴜᴇᴇɴ Hᴀɴꜱɪ Ｍɪɴɪ Ｂᴏᴛ 🐼*_

*╭───────────────●●✿◦*
*┊• 🕊️ \`ɢʀᴇᴇᴛ\` :-* ${greetings}
*┊• 🕊️ \`ᴛɪᴍᴇ\` :-* *${time}*
*┊• 🕊️ \`ᴅᴀᴛᴇ\` :-* *${date}*
*┊• 🕊️ \`ᴏᴡɴᴇʀ\` :-* *${ownername}*
*╰───────────────●●✿◦*

${alivemsg}

*🌐 Qᴜᴇᴇɴ Hᴀɴꜱɪ Mɪɴɪ Bᴏᴛ Wᴇʙꜱɪᴛᴇ :*
> ${pairlink}

${footer}`;

      // 🎥 Alive Video
      await socket.sendMessage(
        sender,
        {
          video: { url: alivevideo },
          mimetype: "video/mp4",
          ptv: true
        },
        { quoted: msg }
      );

      // 🖼️ Alive Image
      await socket.sendMessage(
        sender,
        {
          image: { url: imageurl },
          caption: aliveMessage,
          contextInfo: {
            forwardedNewsletterMessageInfo: {
              newsletterJid: jid,
              newsletterName: jidname,
              serverMessageId: 999
            },
            externalAdReply: {
              title,
              body: pushname,
              mediaType: 1,
              sourceUrl: channel,
              thumbnailUrl: profileurl,
              renderLargerThumbnail: true
            }
          }
        },
        { quoted: shala }
      );

      // 📜 LIST MENU
      await socket.sendMessage(sender, {
        text: "🤖 *Queen Hansi Bot Menu*",
        footer: "Select a command",
        title: "QUEEN HANSI BOT",
        buttonText: "OPEN MENU",
        sections: [
          {
            title: "🤖 BOT COMMANDS",
            rows: [
              {
                title: "⚡ Ping",
                description: "Check bot speed",
                rowId: `${config.PREFIX}ping`
              },
              {
                title: "📜 Menu",
                description: "Open bot menu",
                rowId: `${config.PREFIX}menu`
              },
              {
                title: "🟢 Alive",
                description: "Check bot status",
                rowId: `${config.PREFIX}alive`
              }
            ]
          }
        ]
      }, { quoted: shala });

    } catch (e) {
      console.error(e);
      await socket.sendMessage(
        sender,
        { text: `❌ Aʟɪᴠᴇ Eʀʀᴏʀ:\n${e.message}` },
        { quoted: shala }
      );
    }
  }
};
