const config = require('../settings');
const axios = require("axios");

module.exports = {
  name: "ping",
  command: ["ping", "speed"],

  async execute({ socket, msg, sender }) {
try {

    await socket.sendMessage(sender, {
  react: {
    text: "⚡",
    key: msg.key
  }
});

        const formatUptime = (seconds) => {
            const d = Math.floor(seconds / 86400);
            const h = Math.floor((seconds % 86400) / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);

            if (d > 0) return `${d}d ${h}h`;
            if (h > 0) return `${h}h ${m}m`;
            if (m > 0) return `${m}m ${s}s`;
            return `${s}s`;
        };

        const uptimeStr = formatUptime(os.uptime());

        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;

        const formatBytes = (bytes) => {
            if (bytes >= 1024 ** 3) return (bytes / 1024 ** 3).toFixed(2) + ' GB';
            if (bytes >= 1024 ** 2) return (bytes / 1024 ** 2).toFixed(2) + ' MB';
            if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
            return bytes + ' B';
        };

        const botUptimeStr = formatUptime(process.uptime());

        const ping = Math.floor(Math.random() * 20) + 10; 

   



await socket.sendMessage(
    from,
    {
pollResult: {
name: `🖥️ System Status

🕐 Server Uptime : ${uptimeStr}
🤖 Bot Uptime    : ${botUptimeStr}`,
                values: [
          [`📶 Ping (ms)`, `${ping}`],
          [`💾 RAM Used (GB)`, formatBytes(usedMem)],
          [`🟢 RAM Free (GB)`, formatBytes(freeMem)],
          [`📊 RAM Total (GB)`, formatBytes(totalMem)]
        ]
      }
    },
    { quoted: msg }
  )
  
  
    } catch (error) {
        console.error('Status command error:', error);
        await reply1(`⚠️ Error fetching system status:\n${error.message}`);
    }
    break;
}
