const axios = require('axios');

module.exports = {
  name: "imggenerate",
  command: ["img", "imagegen", "generateimg"],
  category: "ai",
  desc: "Generate image using Hiru API",

  async execute({ socket, msg, sender, args }) {
    try {
      if (!args.length) {
        return socket.sendMessage(sender, { text: "❌ Please provide a prompt!" });
      }

      const prompt = args.join(" ");
      const url = `https://hiru-api-ai.vercel.app/api/generate?apikey=hiru&size=1024x1024&prompt=${encodeURIComponent(prompt)}`;

      const response = await axios.get(url);

      // API returns image URL
      if (!response.data || !response.data.url) {
        return socket.sendMessage(sender, { text: "❌ Failed to generate image. Try again later." });
      }

      await socket.sendMessage(sender, {
        image: { url: response.data.url },
        caption: `🖼 Image generated for: ${prompt}`
      });

    } catch (err) {
      console.error("Image Generate Error:", err.message);
      await socket.sendMessage(sender, { text: "❌ Error generating image. Possibly rate-limited or API down." });
    }
  }
};
