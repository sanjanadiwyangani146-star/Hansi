const config = require('../settings');
const axios = require("axios");

module.exports = {
  name: "owner",
  command: ["owner", "head"],

  async execute({ socket, msg, sender }) {
try {

    await socket.sendMessage(sender, {
  react: {
    text: "🌍",
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

      // Owner vcards
      const vcard1 = `BEGIN:VCARD
VERSION:3.0
FN:Gᴘᴛ Dᴜᴍɪʏʜ Dᴇᴠ
ORG:Gᴘᴛ Dᴜᴍɪʏʜ Dᴇᴠ
TEL;type=CELL;type=VOICE;waid=94769194547:+94 76 919 4547
EMAIL:Qᴜᴇᴇɴʜᴀɴꜱɪᴍɪɴɪ@ɢᴍᴀɪʟ.ᴄᴏᴍ
END:VCARD`;

      const vcard2 = `BEGIN:VCARD
VERSION:3.0
FN:${ownername}
ORG:${ownername}
TEL;type=CELL;type=VOICE;waid=94769490765:+94 76 949 0765
EMAIL:Qᴜᴇᴇɴʜᴀɴꜱɪᴍɪɴɪ@ɢᴍᴀɪʟ.ᴄᴏᴍ
END:VCARD`;

      await socket.sendMessage(
        sender,
        {
          contacts: {
            displayName: "Hᴀɴꜱɪ Bᴏᴛ Oᴡɴᴇʀꜱ",
            contacts: [
              { vcard: vcard1 },
              { vcard: vcard2 }
            ]
          }
        },
        { quoted: shala }
      );

    } catch (e) {
      console.error('owner plugin error:', e);
      await socket.sendMessage(
        sender,
        { text: '\`❌ Fᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ᴏᴡɴᴇʀ ᴅᴇᴛᴀɪʟꜱ.\`' },
        { quoted: shala }
      );
    }
  }
};
