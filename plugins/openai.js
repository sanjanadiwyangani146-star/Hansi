const axios = require('axios');

module.exports = {
  name: "openai",
  command: ["openai", "gpt4", "chatopenai"],

  async execute({ socket, msg, sender }) {
    try {
      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text;

      if (!text) {
        return await socket.sendMessage(sender, {
          text: "❌ Please give a prompt.\n\nExample: .openai hello"
        }, { quoted: msg });
      }

      // remove command
      const q = text.replace(/^[.!\/](openai|gpt4|chatopenai)\s*/i, "");

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

      // 🔥 OPENAI API (ඔයා දීපු එක)
      const url = `https://hiru-api-ai.vercel.app/api/chatopenai?apikey=hiru&text=${encodeURIComponent(q)}`;

      const res = await axios.get(url);
      const data = res.data;

      // response handle
      const result = data.result || data.answer || data.data;

      if (!result) {
        return await socket.sendMessage(sender, {
          text: "❌ No response from OpenAI."
        }, { quoted: msg });
      }

      // send result
      await socket.sendMessage(sender, {
        text: `🤖 *OPENAI RESPONSE*\n\n${result}`
      }, { quoted: msg });

    } catch (err) {
      console.error("OpenAI Error:", err);

      await socket.sendMessage(sender, {
        text: `❌ ${err?.response?.data?.message || err.message}`
      }, { quoted: msg });
    }
  }
};
