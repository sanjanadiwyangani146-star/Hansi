const axios = require("axios")

module.exports = {
  name: "getdp",
  command: ["getdp","dp","profile"],

  async execute({ socket, msg, sender }) {

    try {

      const mention =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

      const reply =
        msg.message?.extendedTextMessage?.contextInfo?.participant

      const target = mention || reply || sender

      let pp

      try {
        pp = await socket.profilePictureUrl(target,"image")
      } catch {
        pp = "https://i.imgur.com/6RL3QbM.png"
      }

      const number = target.split("@")[0]

      await socket.sendMessage(
        sender,
        {
          image:{ url: pp },
          caption:`\`🕊️ Qᴜᴇᴇɴ Hᴀɴꜱɪ Mᴅ Mɪɴɪ\`

\`📸 Rᴏʏᴀʟ Pʀᴏꜰɪʟᴇ Pɪᴄᴛᴜʀᴇ\`
\`👤 Uꜱᴇʀ :\` @${number}

*✨ Pʀᴏꜰɪʟᴇ Pɪᴄᴛᴜʀᴇ Sᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ Rᴇᴛʀɪᴇᴠᴇᴅ*`
          ,
          mentions:[target]
        },
        { quoted: msg }
      )

      await socket.sendMessage(
        sender,
        {
          poll:{
            name:"Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍᴅ ᴍɪɴɪ ᴏᴡɴᴇʀ 🕊️",
            values:[
              "Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ [ ᴏᴡɴᴇʀ ] 🌍️",
              "Gᴘᴛ ᴅᴜᴍɪʏʜ ᴅᴇᴠ [ ᴄᴏʀᴅᴇʀ ] 🌍"
            ],
            selectableCount:1
          }
        },
        { quoted: msg }
      )

    } catch (err) {

      await socket.sendMessage(
        sender,
        { text:`❌ Gᴇᴛᴅᴘ Eʀʀᴏʀ\n${err.message}` },
        { quoted: msg }
      )

    }

  }
        }
