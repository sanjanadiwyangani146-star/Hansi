const axios = require('axios');

module.exports = {
  name: "askai",
  command: ["ask", "askai", "bot"],

  async execute({ socket, msg, sender }) {
    try {
      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text;

      if (!text) {
        return await socket.sendMessage(sender, {
          text: "❌ Please give a prompt.\n\nExample: .askai hello"
        }, { quoted: msg });
      }

      // remove command
      const q = text.replace(/^[.!\/](ask|askai|bot)\s*/i, "");

      if (!q) {
        return await socket.sendMessage(sender, {
          text: "❌ Ask something 😒"
        }, { quoted: msg });
      }

      // react
      await socket.sendMessage(sender, {
        react: { text: "🤖", key: msg.key }
      });

      // loading
      await socket.sendMessage(sender, {
        text: "> *THINKING... 🤖*"
      }, { quoted: msg });

      // 🔥 ASKAI API (ඔයා දීපු එක)
      const url = `https://hiru-api-ai.vercel.app/api/askai?apikey=hiru&q=${encodeURIComponent(q)}`;

      const res = await axios.get(url);
      const data = res.data;

      // API response usually contains answer/result
      const result = data.result || data.answer || data.data;

      if (!result) {
        return await socket.sendMessage(sender, {
          text: "❌ No response from AI."
        }, { quoted: msg });
      }

      // send result
      await socket.sendMessage(sender, {
        text: `🤖 *ASK AI RESPONSE*\n\n${result}`
      }, { quoted: msg });

    } catch (err) {
      console.error("AskAI Error:", err);

      await socket.sendMessage(sender, {
        text: `❌ ${err?.response?.data?.message || err.message}`
      }, { quoted: msg });
    }
  }
};
