const discord = require("discord.js");
const convert = require("parse-ms-2");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("spotify")
    .setDescription("Veja o que um usuário está ouvindo.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("usuário") || interaction.member;

    let status;
    if (user.presence.activities.length === 1)
      status = user.presence.activities[0];
    else if (user.presence.activities.length > 1)
      status = user.presence.activities[1];

    if (
      user.presence.activities.length === 0 ||
      (status.name !== "Spotify" && status.type !== 2)
    ) {
      const spotifyerr = new discord.EmbedBuilder()
        .setColor(client.cor)
        .setTitle(user.displayName + " não está ouvindo Spotify");
      interaction.reply({ embeds: [spotifyerr] });
    }

    if (
      status &&
      status.type === 2 &&
      status.name === "Spotify" &&
      status.assets !== null
    ) {
      const image = `https://i.scdn.co/image/${status.assets.largeImage.slice(
        8
      )}`;
      const name = status.details;
      const artist = status.state;
      const album = status.assets.largeText;
      const timeStart = status.timestamps.start;
      const timeEnd = status.timestamps.end;
      const timeConvert = convert(timeEnd - timeStart);

      const minutes =
        timeConvert.minutes < 10
          ? `0${timeConvert.minutes}`
          : timeConvert.minutes;
      const seconds =
        timeConvert.seconds < 10
          ? `0${timeConvert.seconds}`
          : timeConvert.seconds;
      const time = `${minutes}:${seconds}`;

      const embed = new discord.EmbedBuilder()
        .setAuthor({
          name: user.user.tag,
          iconURL: user.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("Ouvindo no Spotify")
        .setColor(client.cor)
        .setThumbnail(image)
        .addFields(
          {
            name: "Nome da Música:",
            value: `\`\`\`${name}\`\`\``,
            inline: true,
          },
          { name: "Albúm:", value: `\`\`\`${album}\`\`\``, inline: true },
          { name: "Artista:", value: `\`\`\`${artist}\`\`\``, inline: true },
          { name: "Duração:", value: `\`\`\`${time}\`\`\``, inline: false }
        );
      return interaction.reply({ embeds: [embed] });
    }
  },
};
