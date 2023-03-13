const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("matar")
    .setNameLocalizations({
      "pt-BR": "matar",
      "en-US": "kill",
    })
    .setDescription("Eita, vai acontecer um assassinato pelas arredondezas.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const { body } = await superagent.get("https://api.waifu.pics/sfw/kill");
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "kill.gif",
    });
    interaction.reply({
      content: `${interaction.member} matou o(a) <@${member.user.id}>`,
      files: [attachment],
    });
  },
};
