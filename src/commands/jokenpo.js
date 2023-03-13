const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("jokenpo")
    .setDescription("Jogue á Pedra, Papel, Tesoura comigo!")
    .addStringOption((option) =>
      option
        .setName("escolha")
        .setNameLocalizations({ "pt-BR": "escolha", "en-US": "choice" })
        .setDescription("Escolha 1 dos itens.")
        .setChoices(
          { name: "pedra", value: "pedra" },
          { name: "papel", value: "papel" },
          { name: "tesoura", value: "tesoura" }
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const playerChoice = interaction.options.getString("escolha");
    const bruh = ["papel", "pedra", "tesoura"];
    const computerChoice = bruh[Math.floor(Math.random() * bruh.length)];

    if (playerChoice === computerChoice) {
      return interaction.reply({
        content: `${playerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} + ${computerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} = **EMPATE**`,
      });
    } else if (
      (playerChoice === "pedra" && computerChoice === "tesoura") ||
      (playerChoice === "papel" && computerChoice === "pedra") ||
      (playerChoice === "tesoura" && computerChoice === "papel")
    ) {
      return interaction.reply({
        content: `${playerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} + ${computerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} = **JOGADOR VENCEU**`,
      });
    } else {
      return interaction.reply({
        content: `${playerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} + ${computerChoice
          .replace("tesoura", "✂")
          .replace("papel", "📰")
          .replace("pedra", "🪨")} = **DIANNA VENCEU**`,
      });
    }
  },
};
