const axios = require('axios');

module.exports = {
  name: "notegpt",
  command: ["notegpt", "note", "summary"],

  async execute({ socket, msg, sender }) {
    try {
      const text = msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text;

      if (!text) {
        return await socket.sendMessage(sender, {
          text: "❌ Please give text to summarize.\n\nExample: .notegpt long text here..."
        }, { quoted: msg });
      }

      // remove command
      const q = text.replace(/^[.!\/](notegpt|note|summary)\s*/i, "");

      if (!q) {
        return await socket.sendMessage(sender, {
          text: "❌ Give something to summarize 😒"
        }, { quoted: msg });
      }

      // react
      await socket.sendMessage(sender, {
        react: { text: "📝", key: msg.key }
      });

      // loading
      await socket.sendMessage(sender, {
        text: "> *GENERATING NOTES... 📝*"
      }, { quoted: msg });

      // 🔥 NOTEGPT API (ඔයා දීපු එක)
      const url = `https://hiru-api-ai.vercel.app/api/notegpt?apikey=hiru&q=${encodeURIComponent(q)}`;

      const res = await axios.get(url);
      const data = res.data;

      // handle مختلف response formats
      const result = data.result || data.data || data.answer;

      if (!result) {
        return await socket.sendMessage(sender, {
          text: "❌ No response from NoteGPT."
        }, { quoted: msg });
      }

      // send result
      await socket.sendMessage(sender, {
        text: `📝 *NOTE GPT SUMMARY*\n\n${result}`
      }, { quoted: msg });

    } catch (err) {
      console.error("NoteGPT Error:", err);

      await socket.sendMessage(sender, {
        text: `❌ ${err?.response?.data?.message || err.message}`
      }, { quoted: msg });
    }
  }
};
