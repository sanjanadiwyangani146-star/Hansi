const axios = require("axios");

module.exports = {
  name: "fluxai",
  alias: ["flux"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "ai",
  filename: __filename,

  async execute(conn, _mek, m, { q, reply }) {
    if (!q) return reply("Please provide a prompt for the image.");

    try {
      await reply("> *CREATING IMAGE ...🔥*");

      const response = await axios.get(
        `https://api.siputzx.my.id/api/ai/flux?prompt=",${encodeURIComponent(q)}`,
        { responseType: "arraybuffer" }
      );

      if (!response?.data) return reply("Error: No image returned. Try again.");

      const imageBuffer = Buffer.from(response.data, "binary");

      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `✨ *Prompt*: *${q}*\n*${bot.COPYRIGHT}*`
      });

    } catch (error) {
      console.error("FluxAI Error:", error);
      reply(`❌ ${error?.response?.data?.message || error.message}`);
    }
  }
};