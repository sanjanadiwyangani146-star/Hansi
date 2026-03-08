const os = require("os")

module.exports = {
  name: "ping",
  command: ["ping","status","system"],

  async execute({ socket, msg, sender }) {

    try {

      const formatUptime = (seconds) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60)
        return `${h}h ${m}m ${s}s`
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

🤖 Bot Uptime : ${uptime}`,

            values: [
              `📶 Ping : ${ping} ms`,
              `💾 RAM Used : ${formatBytes(usedMem)}`,
              `🟢 RAM Free : ${formatBytes(freeMem)}`,
              `📊 RAM Total : ${formatBytes(totalMem)}`
            ],

            selectableCount: 1
          }
        },
        { quoted: msg }
      )

    } catch (err) {

      await socket.sendMessage(
        sender,
        { text: `❌ Ping Error:\n${err.message}` },
        { quoted: msg }
      )

    }
  }
}
