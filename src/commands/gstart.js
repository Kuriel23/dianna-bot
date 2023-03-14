const discord = require("discord.js");
const ms = require("ms-pt-br");
const messages = require("../util/messages");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gstart")
    .setNameLocalizations({
      "pt-BR": "gcomeçar",
      "en-US": "gstart",
    })
    .setDescription("Comece um sorteio!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("duration")
        .setNameLocalizations({ "pt-BR": "duração", "en-US": "duration" })
        .setDescription(
          "Quanto tempo deve ser o sorteio. Valores exemplares: 1m, 1h, 1d"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setNameLocalizations({ "pt-BR": "ganhadores", "en-US": "winners" })
        .setDescription("Quantos ganhadores devem ter no sorteio")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("prize")
        .setNameLocalizations({ "pt-BR": "prémio", "en-US": "prize" })
        .setDescription("Prémio do sorteio")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setNameLocalizations({ "pt-BR": "canal", "en-US": "channel" })
        .setDescription("Canal onde o sorteio será iniciado")
        .setRequired(true)
        .addChannelTypes(discord.ChannelType.GuildText)
    ),
  async execute(interaction, client) {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayDuration = interaction.options.getString("duration");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinnerCount,
      hostedBy: client.config.hostedBy ? interaction.user : null,
      messages,
    });

    interaction.reply({
      content: `Giveaway começado em ${giveawayChannel}!`,
      ephemeral: true,
    });
  },
};
