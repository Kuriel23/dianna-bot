const discord = require("discord.js");
const { TicTacToe } = require("discord-gamecord");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tictactoe")
    .setNameLocalizations({
      "pt-BR": "jogo_da_velha",
      "en-US": "tictactoe",
    })
    .setDescription("Jogue o jogo da velha com alguém!")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser("usuário"),
      embed: {
        title: "Jogo da Velha",
        color: client.cor,
        statusTitle: "Status",
        overTitle: "Acabou o jogo!",
      },
      emojis: {
        xButton: "❌",
        oButton: "🔵",
        blankButton: "➖",
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: "DANGER",
      oButtonStyle: "PRIMARY",
      turnMessage: "{emoji} | É o turno de **{player}**.",
      winMessage: "{emoji} | **{player}** ganhou o jogo da velha.",
      tieMessage: "O jogo empatou! Ninguém ganhou o jogo da velha!",
      timeoutMessage:
        "O jogo não foi finalizado! Ninguém ganhou o jogo da velha!",
      playerOnlyMessage:
        "Apenas {player} e {opponent} podem usar esses botões.",
    });

    Game.startGame();
  },
};
