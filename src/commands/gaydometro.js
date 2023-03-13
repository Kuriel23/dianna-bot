const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gaydômetro")
    .setNameLocalizations({
      "pt-BR": "gaydômetro",
      "en-US": "gaydometer",
    })
    .setDescription("Saiba o quanto seu amigo é gay")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const gay = Math.floor(Math.random() * 101);
    interaction.reply({
      content: `${member} é ${gay}% gay`,
    });
  },
};
