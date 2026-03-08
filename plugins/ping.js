const os = require("os")

module.exports = {
  name: "ping",
  command: ["ping","status","system"],

  async execute({ socket, msg, sender }) {

    try {
      
      await socket.sendMessage(sender, {
  react: {
    text: "⚡",
    key: msg.key
    }
});

      const start = Date.now();

        const reactionEmojis = ['🔥', '🔮', '🌩️', '👻', '🍁', '🐍', '🎋', '🎐', '🪸', '📍', '👑', '🌀', '🪄'];
        const textEmojis = ['🪀', '🪂', '⚡️', '🚀', '🏎️', '🚁', '🌀', '📟', '🎲', '✨'];

        let reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction
        await conn.sendMessage(from, { react: { text: textEmoji, key: mek.key } });

        const end = Date.now();
        const responseTimeMs = end - start;

        const text = `*${reactionEmoji} Pong ${responseTimeMs} MS*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [`${sender}@s.whatsapp.net`]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
