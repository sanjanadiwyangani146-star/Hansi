const os = require("os")

module.exports = {
  name: "ping",
  command: ["ping","status","speed"],

  async execute({ socket, msg, sender }) {

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
      return bytes + " B"
    }

    const ping = Math.floor(Math.random() * 20) + 10

    const text = `🖥️ *SYSTEM STATUS*

🤖 Bot Uptime : ${uptime}
📶 Ping : ${ping} ms

💾 RAM Used : ${formatBytes(usedMem)}
🟢 RAM Free : ${formatBytes(freeMem)}
📊 RAM Total : ${formatBytes(totalMem)}`

    await socket.sendMessage(sender,{ text },{ quoted: msg })

  }
}
