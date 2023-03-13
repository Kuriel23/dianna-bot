const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gadômetro")
    .setNameLocalizations({
      "pt-BR": "gadômetro",
      "en-US": "gadometer",
    })
    .setDescription("Saiba o quanto seu amigo é gado")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const gado = Math.floor(Math.random() * 101);
    interaction.reply({
      content: `${member} é ${gado}% gado`,
    });
  },
};
