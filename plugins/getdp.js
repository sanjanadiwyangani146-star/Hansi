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

      // 1️⃣ DP Image Send
      await socket.sendMessage(
        sender,
        {
          image:{ url: pp },
          caption:`👑 *QUEEN HANSI MINI BOT*

📸 *Royal Profile Picture*
👤 User : @${number}

✨ Profile Picture Successfully Retrieved`
          ,
          mentions:[target]
        },
        { quoted: msg }
      )

      // 2️⃣ Poll Message Send
      await socket.sendMessage(
        sender,
        {
          poll:{
            name:"👑 CREATED BY QUEEN HANSI TM",
            values:[
              "QUEEN HANSI OWNER 🕊️",
              "GPT DUMIYH DEV 🕊️"
            ],
            selectableCount:1
          }
        },
        { quoted: msg }
      )

    } catch (err) {

      await socket.sendMessage(
        sender,
        { text:`❌ GetDP Error\n${err.message}` },
        { quoted: msg }
      )

    }

  }
}