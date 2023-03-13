const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("beijar")
    .setNameLocalizations({
      "pt-BR": "beijar",
      "en-US": "kiss",
    })
    .setDescription("Oia só beijos para alguém ai")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const { body } = await superagent.get("https://api.waifu.pics/sfw/kiss");
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "kiss.gif",
    });
    interaction.reply({
      content: `${interaction.member} beijou o(a) <@${member.user.id}>`,
      files: [attachment],
    });
  },
};
