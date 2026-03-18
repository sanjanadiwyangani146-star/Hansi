const axios = require('axios');

module.exports = {
  name: "wormgpt",
  command: ["wormgpt", "worm"],

  async execute({ socket, msg, sender }) {
    try {
      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text;

      if (!text) {
        return await socket.sendMessage(sender, {
          text: "❌ Give a prompt.\n\nExample: .wormgpt hello"
        }, { quoted: msg });
      }

      // remove command
      const q = text.replace(/^[.!\/](wormgpt|worm)\s*/i, "");

      if (!q) {
        return await socket.sendMessage(sender, {
          text: "❌ Ask something 😒"
        }, { quoted: msg });
      }

      // react
      await socket.sendMessage(sender, {
        react: { text: "🪱", key: msg.key }
      });

      // loading
      await socket.sendMessage(sender, {
        text: "> *THINKING... 🪱*"
      }, { quoted: msg });

      // 🔥 API (ඔයා දීපු එක)
      const url = `https://hiru-api-ai.vercel.app/api/wormgpt?apikey=hiru&q=${encodeURIComponent(q)}`;

      const res = await axios.get(url);
      const data = res.data;

      const result = data.result || data.data || data.answer;

      if (!result) {
        return await socket.sendMessage(sender, {
          text: "❌ No response from WormGPT."
        }, { quoted: msg });
      }

      // send result
      await socket.sendMessage(sender, {
        text: `🪱 *WORMGPT RESPONSE*\n\n${result}`
      }, { quoted: msg });

    } catch (err) {
      console.error("WormGPT Error:", err);

      await socket.sendMessage(sender, {
        text: `❌ ${err?.response?.data?.message || err.message}`
      }, { quoted: msg });
    }
  }
};
