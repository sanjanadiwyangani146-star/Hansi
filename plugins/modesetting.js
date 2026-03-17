const config = require('../settings');

module.exports = {
  name: "wtype",
  command: ["wtype"],
  category: "settings",

  async execute({ socket, msg, args, sender, nowsender }) {
    try {
      await socket.sendMessage(sender, {
        react: { text: '🛠️', key: msg.key }
      });

      const sanitized = (sender || '').replace(/[^0-9]/g, '');
      const senderNum = (nowsender || '').split('@')[0];
      const ownerNum = config.OWNER_NUMBER.replace(/[^0-9]/g, '');

      if (senderNum !== sanitized && senderNum !== ownerNum) {
        return await socket.sendMessage(sender, {
          text: '❌ Permission denied.'
        }, { quoted: msg });
      }

      let q = args[0];
      const settings = {
        groups: "groups",
        inbox: "inbox",
        private: "private",
        public: "public"
      };

      if (settings[q]) {
        const userConfig = await loadUserConfigFromMongo(sanitized) || {};
        userConfig.WORK_TYPE = settings[q];
        await setUserConfigInMongo(sanitized, userConfig);

        await socket.sendMessage(sender, {
          text: `✅ Work Type → ${settings[q]}`
        }, { quoted: msg });

      } else {
        await socket.sendMessage(sender, {
          text: "❌ Options: public / groups / inbox / private"
        }, { quoted: msg });
      }

    } catch (e) {
      console.error(e);
      await socket.sendMessage(sender, {
        text: "❌ Error!"
      }, { quoted: msg });
    }
  }
};
