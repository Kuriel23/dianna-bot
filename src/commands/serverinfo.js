const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("serverinfo")
    .setNameLocalizations({
      "pt-BR": "informação_server",
      "en-US": "serverinfo",
    })
    .setDescription("Veja informações sobre o servidor."),
  async execute(interaction, client) {
    const verificationLevels = {
      NONE: "Nenhuma",
      LOW: "Baixa",
      MEDIUM: "Média",
      HIGH: "Alta",
      VERY_HIGH: "Muito alta",
    };

    const premiumTier = {
      NONE: `Esse servidor não possui boost.`,
      TIER_1: `Nível 1`,
      TIER_2: `Nível 2`,
      TIER_3: `Nível 3`,
    };

    const owner = await interaction.guild.fetchOwner();

    const embed = new discord.EmbedBuilder()
      .setColor(client.cor)
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor({ name: "🔍 Informações do servidor" })
      .addField("**Nome**", interaction.guild.name, true)
      .addField("**ID**", interaction.guild.id, true)
      .addField("**Dono(a)**", `${owner}`, true)
      .addField(`**Canais**`, `${interaction.guild.channels.cache.size}`, true)
      .addField("**Cargos**", `${interaction.guild.roles.cache.size}`, true)
      .addField(
        "**Humanos | Bots**",
        `${
          interaction.guild.members.cache.filter((member) => !member.user.bot)
            .size
        } | ${
          interaction.guild.members.cache.filter((member) => member.user.bot)
            .size
        }`,
        true
      )
      .addField(
        `**Canal de Regras**`,
        `<#${interaction.guild.rulesChannelId}>`,
        true
      )
      .addField(
        "**Nível de boost**",
        premiumTier[interaction.guild.premiumTier],
        true
      )
      .addField(
        `**Nível de verificação**`,
        `${verificationLevels[interaction.guild.verificationLevel]}`,
        true
      )
      .addField(
        "**Criado em**",
        discord.time(interaction.guild.createdAt, "f"),
        true
      )
      .addField(
        `**Descrição**`,
        `${interaction.guild.description || `Servidor não possui descrição`}`
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
