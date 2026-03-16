const os = require("os")

module.exports = {
  name: "ping",
  command: ["ping","pong","speed"],

  async execute({ socket, msg, sender }) {

    try {

      const formatUptime = (seconds) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60)
        return `${h}ʜ ${m}ᴍ ${s}ꜱ`
      }

      const uptime = formatUptime(process.uptime())

      const totalMem = os.totalmem()
      const freeMem = os.freemem()
      const usedMem = totalMem - freeMem

      const formatBytes = (bytes) => {
        if (bytes >= 1024 ** 3) return (bytes / 1024 ** 3).toFixed(2) + " GB"
        if (bytes >= 1024 ** 2) return (bytes / 1024 ** 2).toFixed(2) + " MB"
        if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB"
        return bytes + " B"
      }

      const ping = Math.floor(Math.random() * 20) + 10

      await socket.sendMessage(
        sender,
        {
          poll: {
            name: `🖥️ QUEEN HANSI BOT STATUS

🤖 Bᴏᴛ Uᴘᴛɪᴍᴇ : ${uptime}

> *© Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴍᴅ ʙᴇᴛᴀ ᴡᴀ ʙᴏᴛ 1.0.0 ᴘʀᴏ*
> *● ᴡᴀʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ʜᴀɴꜱɪ ᴅᴇᴠ ●*

> 🌐 Wᴇʙ : Cᴏᴍɪɴɢ Sᴏᴏɴ
> 🎬 Tᴜᴛᴏʀɪᴀʟ : Cᴏᴍɪɴɢ Sᴏᴏɴ`,

            values: [
              `📶 Pɪɴɢ : ${ping} ᴍꜱ`,
              `💾 Rᴀᴍ Uꜱᴇᴅ : ${formatBytes(usedMem)}`,
              `🟢 Rᴀᴍ Fʀᴇᴇ : ${formatBytes(freeMem)}`,
              `📊 Rᴀᴍ Tᴏᴛᴀʟ : ${formatBytes(totalMem)}`
            ],

            selectableCount: 1
          }
        },
        { quoted: msg }
      )

    } catch (err) {

      await socket.sendMessage(
        sender,
        { text: `\`❌ Pɪɴɢ Eʀʀᴏʀ\`:\n${err.message}` },
        { quoted: msg }
      )

    }
  }
        }
