const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("rickroll")
    .setDescription("Never gonna give you up"),
  async execute(interaction, client) {

    const embed = new discord.EmbedBuilder()
      .setColor(client.cor)
      .setImage("https://media.tenor.com/x8v1oNUOmg4AAAAC/rickroll-roll.gif");
    interaction.reply({
      embeds: [embed],
    });
  },
};
