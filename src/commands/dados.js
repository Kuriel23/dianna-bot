const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("dados")
    .setNameLocalizations({
      "pt-BR": "dados",
      "en-US": "dice",
    })
    .setDescription("Role até 5 dados"),
  async execute(interaction, client) {
    const dados = Math.floor(Math.random() * 5) + 1;
    interaction.reply({
      content: `${interaction.member} e foi o número ${dados}`,
    });
  },
};
