const fs = require("fs")
const config = require("../settings")

module.exports = {
  name: "menu",
  command: ["menu"],

  async execute({ socket, msg, sender }) {

    try {

      await socket.sendMessage(sender,{
        react:{ text:"❤️‍🔥", key:msg.key }
      })

      const uptime = Math.floor(process.uptime())
      const hours = Math.floor(uptime / 3600)
      const minutes = Math.floor((uptime % 3600) / 60)

      const curHr = new Date().getHours()

      const greetings =
        curHr < 12
        ? "𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 ⛅"
        : curHr < 18
        ? "𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧 🌞"
        : "𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌙"

      const botName = "QUEEN HANSI MINI BOT"

      const shonux = {
        key:{
          remoteJid:"status@broadcast",
          participant:"0@s.whatsapp.net",
          fromMe:false,
          id:"META_AI_MENU"
        },
        message:{
          contactMessage:{
            displayName:botName,
            vcard:`BEGIN:VCARD
VERSION:3.0
N:${botName};;;;
FN:${botName}
ORG:Queen Hansi Bot
END:VCARD`
          }
        }
      }

      const imageUrl = "https://files.catbox.moe/zbymi5.jpg"

      const text = `
👋 ${greetings}

💠────────────────────────────💠
     👑  QUEEN HANSI BOT  👑
💠────────────────────────────💠

🛡️ Status  : Online
⏳ Uptime  : ${hours}h ${minutes}m
📡 Signal  : Excellent
💻 Platform: Heroku / VPS

╭━━━〔 MAIN COMMANDS 〕━━━╮
│ 💙 ➜ 📂 DOWNLOAD MENU
│ ❤️ ➜ 🎨 CREATIVE MENU
│ 💜 ➜ 🛠️ TOOLS MENU
│ 🧡 ➜ ⚙️ SETTINGS MENU
│ 🤍 ➜ 👑 OWNER MENU
╰━━━━━━━━━━━━━━━━━━╯

👑 Owner : Queen Hansi
💠────────────────────────────💠

> Powered By ${botName}
`.trim()

      const buttons = [
        {
          buttonId:`${config.PREFIX}download`,
          buttonText:{ displayText:"📂 DOWNLOAD MENU"},
          type:1
        },
        {
          buttonId:`${config.PREFIX}creative`,
          buttonText:{ displayText:"🎨 CREATIVE MENU"},
          type:1
        },
        {
          buttonId:`${config.PREFIX}tools`,
          buttonText:{ displayText:"🛠️ TOOLS MENU"},
          type:1
        },
        {
          buttonId:`${config.PREFIX}settings`,
          buttonText:{ displayText:"⚙️ SETTINGS MENU"},
          type:1
        },
        {
          buttonId:`${config.PREFIX}owner`,
          buttonText:{ displayText:"👑 OWNER MENU"},
          type:1
        }
      ]

      await socket.sendMessage(sender,{
        document:{ url:imageUrl },
        mimetype:"application/docx",
        fileName:`${botName} SYSTEM`,
        caption:text,
        buttons,
        headerType:6
      },{ quoted: shonux })

    } catch(err){

      console.log("menu plugin error:",err)

      await socket.sendMessage(
        sender,
        { text:"❌ Failed to show menu." },
        { quoted: msg }
      )

    }

  }
}
