const discord = require("discord.js");
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("jokenpo")
    .setDescription("Jogue á Pedra, Papel, Tesoura comigo!")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const Game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser("usuário"),
      embed: {
        title: "Jokenpo",
        color: client.cor,
        description: "Pressione um botão abaixo para escolher.",
      },
      buttons: {
        rock: "Pedra",
        paper: "Papel",
        scissors: "Tesoura",
      },
      emojis: {
        rock: "🌑",
        paper: "📰",
        scissors: "✂️",
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      pickMessage: "Você escolheu {emoji}.",
      winMessage: "**{player}** ganhou o jogo! Parabéns!",
      tieMessage: "O jogo empatou! Ninguém ganhou o jokenpo!",
      timeoutMessage: "O jogo não foi finalizado! Ninguém ganhou o jokenpo!",
      playerOnlyMessage:
        "Apenas {player} e {opponent} podem usar esses botões.",
    });

    Game.startGame();
  },
};
