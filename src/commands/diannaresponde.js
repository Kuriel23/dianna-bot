const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("diannaresponde")
    .setDescription("Te responderei algumas perguntas!")
    .addStringOption((option) =>
      option
        .setName("pergunta")
        .setNameLocalizations({ "pt-BR": "pergunta", "en-US": "question" })
        .setDescription("Pergunte alguma coisa")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const pergunta = interaction.options.getString("pergunta");
    const respostas = ["Sim", "Não", "Não faço ideia", "Talvez"];
    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    interaction.reply({ content: `P: ${pergunta}\n\nR: ${resposta}` });
  },
};
