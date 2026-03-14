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

      // Remote JSON fetch with timeout & fallback
      let ownerdata;
      try {
        ownerdata = (await axios.get(
          "https://raw.githubusercontent.com/DUM-324BY/HANSI-MD-DATABASE/refs/heads/main/alivedata.json",
          { timeout: 5000 }
        )).data;
      } catch (err) {
        console.warn("❌ Cannot fetch remote data, using fallback");
        ownerdata = {
  "imageurl": "https://i.ibb.co/SzsVXwp/1bf2ea0ee756.jpg",
  "profileurl": "https://i.ibb.co/CKjbrpwY/967ff8bd4d24.jpg",
  "aliveimg" : "https://i.ibb.co/SzsVXwp/1bf2ea0ee756.jpg",
  "helpimg" : "",
  "alivemsg": "*💡 Iꜰ ʏᴏᴜ ɴᴇᴇᴅ ʜᴇʟᴘ ʀᴇɢᴀʀᴅɪɴɢ ᴛʜᴇ ʙᴏʏ , ᴛʏᴘᴇ :* .ʜᴇʟᴘ",
  "alivevideo": "https://files.catbox.moe/wh3zqc.mp4",
  "footer": "> *© Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍᴅ ʙᴇᴛᴀ ᴡᴀ ʙᴏᴛ 1.0.0 ᴘʀᴏ*\n> *● ᴡᴀʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ ●*\n\n> 🌐 Wᴇʙ : Cᴏᴍɪɴɢ Sᴏᴏɴ\n> 🎬 Tᴜᴛᴏʀɪᴀʟ : Cᴏᴍɪɴɢ Sᴏᴏɴ",
  "ownernumber": "94769194547",
  "ownername": "Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ",
  "version" : "1.0.0 Pʀᴏ",
  "platform" : "Hᴇʀᴏᴋᴜ / Vᴘꜱ",
  "pairlink" : "Cᴏᴍɪɴɢ Sᴏᴏɴ",
  "repo" : "https://github.com",
  "channel" : "https://whatsapp.com/channel/0029VbCG0yxEwEk21tFzPT16",
  "supglink" : "https://chat.whatsapp.com/LbmbY5xzVXS98KCt6XDWsF?mode=gi_t",
  "jid" : "120363405871120956@newsletter",
  "jidname" : "Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴜᴘᴅᴀᴛᴇꜱ",
  "botname" : "Qᴜᴇᴇɴ Hᴀɴꜱɪ",
  "header": "Qᴜᴇᴇɴ Hᴀɴꜱɪ"

        };
      }

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
