const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("sugerir")
    .setNameLocalizations({
      "pt-BR": "sugerir",
      "en-US": "suggest",
    })
    .setDescription("Sugira melhorias para o nosso servidor!")
    .addStringOption((option) =>
      option
        .setName("ideia")
        .setNameLocalizations({ "pt-BR": "ideia", "en-US": "ideia" })
        .setDescription("Descreva a sua ideia")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const ideia = interaction.options.getString("ideia");
    const embed = new discord.EmbedBuilder()
      .setAuthor({
        name: `Sugestão de ${interaction.member.user.tag}`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(client.cor)
      .setFooter({ text: `ID do Usuário: ${interaction.member.user.id}` })
      .setThumbnail("https://i.imgur.com/5GlThvk.png")
      .setDescription(
        "**" +
          ideia +
          "**\n\n:thumbsup: **› Gostei**\n\n:thumbsdown: **› Não Gostei**"
      );

    const aprovado = new discord.ButtonBuilder()
      .setCustomId("aprovado")
      .setStyle(3)
      .setLabel("Aprovar")
      .setEmoji("✔");
    const jaexiste = new discord.ButtonBuilder()
      .setCustomId("jaexiste")
      .setStyle(2)
      .setLabel("Já existe")
      .setEmoji("🔁");
    const rejeitado = new discord.ButtonBuilder()
      .setCustomId("rejeitado")
      .setStyle(4)
      .setLabel("Rejeitar")
      .setEmoji("❌");

    const row = new discord.ActionRowBuilder().setComponents(
      aprovado,
      jaexiste,
      rejeitado
    );

    client.channels.cache
      .get(client.canais.sugestoes)
      .send({ embeds: [embed], components: [row] })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
        interaction.reply({
          content: `Sua sugestão foi enviada com sucesso! [Clique aqui para ver](${msg.url})`,
          ephemeral: true,
        });
        msg.startThread({
          name: "Fale mais da sugestão aqui",
          autoArchiveDuration: 10080,
          reason: "Sugestão nova para discutir",
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
