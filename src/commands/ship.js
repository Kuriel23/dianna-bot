const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ship")
    .setDescription("Saiba o quanto seu amigo é gado")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("usuário2")
        .setNameLocalizations({ "pt-BR": "usuário2", "en-US": "user2" })
        .setDescription("Identifique o utilizador 2")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const member2 =
      interaction.options.getMember("user2") || interaction.member;
    const ship = Math.floor(Math.random() * 101);
    interaction.reply({
      content: `${member} + ${member2} = ${ship}% de dar certo! ${
        ship > 50
          ? "Podiam já formar um belo par."
          : "Ainda têm um longo caminho para seguir..."
      }`,
    });
  },
};
