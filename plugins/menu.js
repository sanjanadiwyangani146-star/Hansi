const fs = require("fs")
const config = require("../settings")

module.exports = {
  name: "menu",
  command: ["menu"],

  async execute({ socket, msg, sender }) {

    try {

      await socket.sendMessage(sender,{
        react:{ text:"❤️‍🔥", key:msg.key }
        const startTime = socketCreationTime.get(number) || Date.now();
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // Load Config
    let userCfg = {};
    try { if (number && typeof loadUserConfigFromMongo === 'function') userCfg = await loadUserConfigFromMongo((number || '').replace(/[^0-9]/g, '')) || {}; }
    catch(e){ console.warn('menu: failed to load config', e); userCfg = {}; }

    // 🔥 NAME CHANGED TO —͟͞͞★ᴅᴛᴢ ɴᴏᴠᴀ x ᴍᴅㅤ✓ MINI V1
    const title = userCfg.botName || '© 💚—͟͞͞★ᴅᴛᴢ ɴᴏᴠᴀ x ᴍᴅㅤ✓😘';

    // ⌚ Greeting Logic (Time Based)
    const curHr = new Date().getHours();
    const greetings = curHr < 12 ? '𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 ⛅' : curHr < 18 ? '𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧 🌞' : '𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌙';

    // 🔹 Fake Contact for Context
    const shonux = {
        key: {
            remoteJid: "status@broadcast",
            participant: "0@s.whatsapp.net",
            fromMe: false,
            id: "META_AI_FAKE_ID_MENU"
        },
        message: {
            contactMessage: {
                displayName: title,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${title};;;;\nFN:${title}\nORG:—͟͞͞★ᴅᴛᴢ ɴᴏᴠᴀ x ᴍᴅㅤ✓ Team\nEND:VCARD`
            }
        }
    };

    // 🖼️ Image/Logo Logic
    const defaultImg = 'https://i.ibb.co/SzsVXwp/1bf2ea0ee756.jpg';
    const useLogo = userCfg.logo || defaultImg;
    
    let bufferImg;
    let imagePayload;
    if (String(useLogo).startsWith('http')) {
        imagePayload = { url: useLogo };
    } else {
        try { 
            bufferImg = fs.readFileSync(useLogo); 
            imagePayload = bufferImg;
        } catch(e){ 
            imagePayload = { url: defaultImg }; 
        }
    }

    // ✨ MENU TEXT (New Style & Fonts)
	  const platform = "Senasuru"
    const text = `
👋 ${greetings}


💠────────────────────────────💠
  ✨ ᴅᴛᴢ ɴᴏᴠᴀ x ᴍᴅ • ᴇʟɪᴛᴇ ✨
💠────────────────────────────💠

╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  💎  ᴘʀᴇᴍɪᴜᴍ ᴅᴀsʜʙᴏᴀʀᴅ  💎                       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

  ┏━━━━━━  ◈ sʏsᴛᴇᴍ ◈  ━━━━━━┓
  ┃
  ┃ 🛡️ sᴛᴀᴛᴜs   : ᴏɴʟɪɴᴇ
  ┃ ⏳ ᴜᴘᴛɪᴍᴇ   : ${hours}ʜ ${minutes}ᴍ
  ┃ 📡 sɪɢɴᴀʟ   : ᴇxᴄᴇʟʟᴇɴᴛ
  ┃ 💻 ᴘʟᴀᴛғᴏʀᴍ : ʜᴇʀᴏᴋᴜ ᴘʀᴏ
  ┃ 🔗 sᴏᴄᴋᴇᴛs  : ${activeSockets.size} ᴜsᴇʀs
  ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

╭━━━〔MAIN-CMDS〕━━>
┃╭━━━━━━━━━━━━━◉
│ 💙 ➜ 📂 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔
│ ❤️ ➜ 🎨 𝐂𝐑𝐄𝐀𝐓𝐈𝐕𝐄 𝐌𝐄𝐍𝐔
│ 💜 ➜ 🛠️ 𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔
│ 🧡 ➜ ⚙️ 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒 𝐌𝐄𝐍𝐔
│ 🤍 ➜ 🥷 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔
┃╰━━━━━━━━━━━━━◉
╰━━━━━━━━━━━━━━>
💠────────────────────────────💠
       👑 ᴏᴡɴᴇʀ : ᴅᴛᴢ ᴅᴜʟᴀ
    📞 ᴄᴏɴᴛᴀᴄᴛ : +94 752 978 237
💠────────────────────────────💠
  ◈ ɴᴏᴠᴀ x • ᴛʜᴇ ꜰᴜᴛᴜʀᴇ ɪꜱ ʜᴇʀᴇ ◈
💠────────────────────────────💠

> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 ${botName}
`.trim();

    const buttons = [
      { buttonId: `${config.PREFIX}download`, buttonText: { displayText: "📂 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔" }, type: 1 },
      { buttonId: `${config.PREFIX}creative`, buttonText: { displayText: "🎨 𝐂𝐑𝐄𝐀𝐓𝐈𝐕𝐄 𝐌𝐄𝐍𝐔" }, type: 1 },
      { buttonId: `${config.PREFIX}tools`, buttonText: { displayText: "🛠️ 𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔" }, type: 1 },
      { buttonId: `${config.PREFIX}settings`, buttonText: { displayText: "⚙️ 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒 𝐌𝐄𝐍𝐔" }, type: 1 },
      { buttonId: `${config.PREFIX}owner`, buttonText: { displayText: "🥷 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔" }, type: 1 }
    ];

    // 📤 Sending as Document (PDF)
    await socket.sendMessage(sender, {
      document: imagePayload,
      mimetype: 'application/docx',
      fileName: `${botName} 𝐒𝐘𝐒𝐓𝐄𝐌 🔮`, 
      fileLength: 109951162777600, 
      pageCount: 2026,
      caption: text,
      contextInfo: {
          externalAdReply: {
              title: title,
              body: "𝐅𝐢𝐥𝐞 𝐒𝐢𝐳𝐞 : 1000𝐓𝐁",
              thumbnail: bufferImg,
              sourceUrl: 'https://whatsapp.com',
              mediaType: 1,
              renderLargerThumbnail: true
          }
      },
      buttons,
      headerType: 6
    }, { quoted: shonux });

  } catch (err) {
    console.error('menu command error:', err);
    try { await socket.sendMessage(sender, { text: '❌ Failed to show menu.' }, { quoted: msg }); } catch(e){}
  }
  break;
}
      
    
