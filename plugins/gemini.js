const axios = require('axios');

module.exports = {
  name: "gemini",
  command: ["gemini", "gemi"],

  async execute({ socket, msg, sender }) {
    try {
      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text;

      if (!text) {
        return await socket.sendMessage(sender, {
          text: "❌ Please give a prompt.\n\nExample: .gemini hello"
        }, { quoted: msg });
      }

      // remove command
      const q = text.replace(/^[.!\/](gemini|gemi)\s*/i, "");

      if (!q) {
        return await socket.sendMessage(sender, {
          text: "❌ Ask something 😒"
        }, { quoted: msg });
      }

      // react
      await socket.sendMessage(sender, {
        react: { text: "🧠", key: msg.key }
      });

      // loading
      await socket.sendMessage(sender, {
        text: "> *THINKING... 🧠*"
      }, { quoted: msg });

      // 🔥 GEMINI API (ඔයා දීපු එක)
      const url = `https://hiru-api-ai.vercel.app/api/gemini?apikey=hiru&q=${encodeURIComponent(q)}`;

      const res = await axios.get(url);
      const data = res.data;

      if (!data?.result && !data?.data) {
        return await socket.sendMessage(sender, {
          text: "❌ No response from Gemini."
        }, { quoted: msg });
      }

      const result = data.result || data.data;

      // send result
      await socket.sendMessage(sender, {
        text: `🧠 *GEMINI AI RESPONSE*\n\n${result}`
      }, { quoted: msg });

    } catch (err) {
      console.error("Gemini Error:", err);

      await socket.sendMessage(sender, {
        text: `❌ ${err?.response?.data?.message || err.message}`
      }, { quoted: msg });
    }
  }
};
