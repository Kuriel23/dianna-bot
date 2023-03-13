const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tapa")
    .setNameLocalizations({
      "pt-BR": "tapa",
      "en-US": "slap",
    })
    .setDescription("Eita, uns tapas vai rolar por aí.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const { body } = await superagent.get("https://api.waifu.pics/sfw/slap");
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "slap.gif",
    });
    interaction.reply({
      content: `${interaction.member} deu um tapa no(a) <@${member.user.id}>`,
      files: [attachment],
    });
  },
};
