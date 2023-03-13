const discord = require("discord.js");
module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("banco")
    .setNameLocalizations({ "pt-BR": "banco", "en-US": "bank" })
    .setDescription("Veja o saldo no banco de alguém.")
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
    const ec = await client.db.Users.findOne({ _id: membro.id });

    await interaction.reply({
      content: `${interaction.member.id === membro.id ? "Você" : membro} têm ${
        ec.coins
      } moedas.`,
    });

    if (!ec) {
      new client.db.Users({ _id: membro.id }).save();
      return interaction.reply({ embeds: [client.embeds.registro] });
    }
  },
};
