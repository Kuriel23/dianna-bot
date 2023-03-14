const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("greroll")
    .setNameLocalizations({
      "pt-BR": "gresortear",
      "en-US": "greroll",
    })
    .setDescription("Faça um resorteio!")
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
        content: "Sorteio não encontrado para `" + query + "`.",
        ephemeral: true,
      });
    }

    if (!giveaway.ended) {
      return interaction.reply({
        content: "Este sorteio ainda não acabou.",
        ephemeral: true,
      });
    }

    client.giveawaysManager
      .reroll(giveaway.messageId)
      .then(() => {
        interaction.reply({
          content: "Resorteado com sucesso!",
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
