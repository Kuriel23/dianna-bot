const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("userinfo")
    .setNameLocalizations({
      "pt-BR": "info_usuário",
      "en-US": "userinfo",
    })
    .setDescription("Veja várias informações úteis do usuário!")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const membro = interaction.options.getMember("usuário");
    if (!membro)
      return interaction.reply({
        content: "Não foi encontrado um usuário dentro deste servidor.",
      });
    const info = new discord.ButtonBuilder()
      .setCustomId("info")
      .setLabel("Informação")
      .setEmoji("1036702634603728966")
      .setStyle(2);
    const roles = new discord.ButtonBuilder()
      .setCustomId("roles")
      .setLabel("Cargos")
      .setEmoji("1041100114762149958")
      .setStyle(2);
    const row = new discord.ActionRowBuilder().addComponents(info, roles);

    const embed = new discord.EmbedBuilder()
      .setTitle(membro.user.tag)
      .addFields(
        {
          name: "ID:",
          value: membro.user.id,
          inline: true,
        },
        {
          name: "Criada em: ",
          value: `${discord.time(membro.user.createdAt, "f")} (${discord.time(
            membro.user.createdAt,
            "R"
          )})`,
          inline: true,
        },
        {
          name: "Entrou em: ",
          value: membro.joinedTimestamp
            ? `${discord.time(
                Math.floor(membro.joinedTimestamp / 1000),
                "f"
              )} (${discord.time(
                Math.floor(membro.joinedTimestamp / 1000),
                "R"
              )})`
            : "Não está dentro do servidor.",
          inline: true,
        }
      )
      .setColor(client.cor)
      .setThumbnail(membro.user.displayAvatarURL({ extension: "png" }));
    const mensagem = await interaction.reply({
      embeds: [embed],
      components: [row],
    });
    const filter = (i) => interaction.user.id === i.user.id;
    const collector = mensagem.createMessageComponentCollector({
      componentType: discord.ComponentType.Button,
      filter,
      time: 300000,
    });

    collector.on("collect", async (i) => {
      i.deferUpdate();
      if (i.customId === "info") interaction.editReply({ embeds: [embed] });
      if (i.customId === "roles") {
        const guildsemb = new discord.EmbedBuilder()
          .setColor(client.cor)
          .setThumbnail(membro.user.displayAvatarURL({ extension: "png" }))
          .setTitle(membro.user.tag)
          .setDescription(
            `${
              membro._roles.map((role) => "<@&" + role + ">").join(", ") ||
              "Sem cargos."
            }`
          );
        interaction.editReply({ embeds: [guildsemb] });
      }
    });
  },
};
