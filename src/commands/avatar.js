const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Veja o avatar de algum usuário.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const membro =
      interaction.options.getMember("usuário") || interaction.member;
    if (!membro)
      return interaction.reply({
        content: "Não foi encontrado um usuário dentro deste servidor.",
      });

    const embed = new discord.EmbedBuilder()
      .setAuthor({
        name: `Avatar de ${membro.user.tag}`,
        url: membro.user.displayAvatarURL({
          extension: "png",
        }),
      })
      .setColor(client.cor)
      .setImage(membro.user.displayAvatarURL({ extension: "png", size: 2048 }));
    interaction.reply({
      embeds: [embed],
    });
  },
};
