const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gend")
    .setNameLocalizations({
      "pt-BR": "gacabar",
      "en-US": "gend",
    })
    .setDescription("Acabe um sorteio!")
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
        content: "Não foi possível achar sorteio para `" + query + "`.",
        ephemeral: true,
      });
    }

    if (giveaway.ended) {
      return interaction.reply({
        content: "Este sorteio já acabou.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .end(giveaway.messageId)
      .then(() => {
        interaction.reply({ content: "Sorteio acabou!", ephemeral: true });
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
};
