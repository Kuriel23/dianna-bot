module.exports = (client, interaction) => {
  if (!interaction.member.permissions.has("Administrator"))
    return interaction.reply({
      content: "Este botão não é para você, sai sai!",
      ephemeral: true,
    });
  interaction.reply({ content: "Esta sugestão foi rejeitada!" });
};
