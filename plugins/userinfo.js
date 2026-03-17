// userinfo.plugin.js
const moment = require("moment-timezone");

module.exports = {
  name: "user info",
  alias: ["user", "profile"],
  desc: "Get complete user profile information",
  category: "group",
  use: ".person [@tag or reply]",
  react: "👤",

  async execute(conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) {
    try {
      // 1. Determine target user
      let userJid = quoted?.sender ||
                    mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                    sender;

      // 2. Verify user exists
      const [user] = await conn.onWhatsApp(userJid).catch(() => []);
      if (!user?.exists) return reply("❌ User not found on WhatsApp");

      // 3. Get profile picture
      let ppUrl;
      try {
        ppUrl = await conn.profilePictureUrl(userJid, 'image');
      } catch {
        ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
      }

      // 4. Get user name
      let userName = userJid.split('@')[0];
      try {
        if (isGroup) {
          const member = participants.find(p => p.id === userJid);
          if (member?.notify) userName = member.notify;
        }
        if (userName === userJid.split('@')[0] && conn.contactDB) {
          const contact = await conn.contactDB.get(userJid).catch(() => null);
          if (contact?.name) userName = contact.name;
        }
        if (userName === userJid.split('@')[0]) {
          const presence = await conn.presenceSubscribe(userJid).catch(() => null);
          if (presence?.pushname) userName = presence.pushname;
        }
      } catch (e) {
        console.log("Name fetch error:", e);
      }

      // 5. Get bio/about
      let bio = {};
      try {
        const statusData = await conn.fetchStatus(userJid).catch(() => null);
        if (statusData?.status) {
          bio = {
            text: statusData.status,
            type: "Personal",
            updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
          };
        } else {
          const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
          if (businessProfile?.description) {
            bio = { text: businessProfile.description, type: "Business", updated: null };
          }
        }
      } catch (e) {
        console.log("Bio fetch error:", e);
      }

      // 6. Group role
      let groupRole = "";
      if (isGroup) {
        const participant = participants.find(p => p.id === userJid);
        groupRole = participant?.admin ? "👑 Admin" : "👥 Member";
      }

      // 7. Format output
      const formattedBio = bio.text ? 
        `${bio.text}\n└─ 📌 ${bio.type} Bio${bio.updated ? ` | 🕒 ${bio.updated.toLocaleString()}` : ''}` : 
        "No bio available";

      const userInfo = `
*GC MEMBER INFORMATION 🧊*

📛 *Name:* ${userName}
🔢 *Number:* ${userJid.replace(/@.+/, '')}
📌 *Account Type:* ${user.isBusiness ? "💼 Business" : user.isEnterprise ? "🏢 Enterprise" : "👤 Personal"}

*📝 About:*
${formattedBio}

*⚙️ Account Info:*
✅ Registered: ${user.isUser ? "Yes" : "No"}
🛡️ Verified: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
${isGroup ? `👥 *Group Role:* ${groupRole}` : ''}
`.trim();

      // 8. Send result as plugin style
      await conn.sendMessage(from, {
        image: { url: ppUrl },
        caption: userInfo,
        mentions: [userJid]
      }, { quoted: mek });

    } catch (e) {
      console.error("User Info Plugin Error:", e);
      reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
  }
};
