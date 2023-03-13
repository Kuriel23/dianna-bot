const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("falar")
    .setNameLocalizations({
      "pt-BR": "falar",
      "en-US": "say",
    })
    .setDescription("Faça eu dizer algo."),
  async execute(interaction, client) {
    const member = interaction.user;
    const modal = new discord.ModalBuilder()
      .setCustomId("say" + interaction.member.id)
      .setTitle("Comando /say");
    const mensagemInput = new discord.TextInputBuilder()
      .setCustomId("mensagem")
      .setLabel("Mensagem para eu falar")
      .setMaxLength(1000)
      .setStyle(2);
    const secondActionRow = new discord.ActionRowBuilder().addComponents(
      mensagemInput
    );
    modal.addComponents(secondActionRow);
    await interaction.showModal(modal);

    const i = await interaction
      .awaitModalSubmit({
        time: 300000,
        filter: (i) => i.user.id === interaction.user.id,
      })
      .catch((error) => {
        if (error) return null;
      });

    if (i) {
      const mensagem = i.fields.getTextInputValue("mensagem");
      const button = new discord.ButtonBuilder()
        .setStyle(2)
        .setCustomId("autor")
        .setLabel("Enviado por: " + member.tag)
        .setDisabled(true)
        .setEmoji("🤸‍♀️");
      const row = new discord.ActionRowBuilder().addComponents(button);
      interaction.channel.send({ content: mensagem, components: [row] });
      i.reply({ content: "Sucesso!", ephemeral: true });
    }
  },
};
