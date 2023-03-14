const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gpause")
    .setNameLocalizations({
      "pt-BR": "gpausar",
      "en-US": "gpause",
    })
    .setDescription("Pause um sorteio!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("giveaway")
        .setNameLocalizations({ "pt-BR": "sorteio", "en-US": "giveaway" })
        .setDescription("Sorteio para acabar (ID da Mensagem ou Prémio)")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const query = interaction.options.getString("giveaway");

    const giveaway =
      client.giveawaysManager.giveaways.find(
        (g) => g.prize === query && g.guildId === interaction.guild.id
      ) ||
      client.giveawaysManager.giveaways.find(
        (g) => g.messageId === query && g.guildId === interaction.guild.id
      );

    if (!giveaway) {
      return interaction.reply({
        content: "Não foi possível encontrar sorteio para `" + query + "`.",
        ephemeral: true,
      });
    }

    if (giveaway.pauseOptions.isPaused) {
      return interaction.reply({
        content: "Este sorteio já está pausado.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .pause(giveaway.messageId)
      .then(() => {
        interaction.reply({
          content: "Sorteio pausado com sucesso!",
          ephemeral: true,
        });
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
};
