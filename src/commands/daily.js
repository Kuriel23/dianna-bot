const discord = require("discord.js");
const ms = require("parse-ms-2");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("daily")
    .setNameLocalizations({ "pt-BR": "diário", "en-US": "daily" })
    .setDescription("Resgate um dinheiro a cada 24h."),
  async execute(interaction, client) {
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (err)
          return interaction.reply({
            content: "Erro no banco de dados encontrado.",
            ephemeral: true,
          });
        const valueRandom = Math.floor(
          Math.random() * (10000 - 1000 + 1) + 1000
        );
        if (doc) {
          const delayTime = 86400000;
          if (delayTime - (Date.now() - doc.dailyCooldown) > 0) {
            const _time = ms(delayTime - (Date.now() - doc.dailyCooldown));
            const emb = new discord.EmbedBuilder()
              .setAuthor({
                name: `» Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para coletar o seu daily.`,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [emb] });
          } else {
            doc.coins += valueRandom;
            doc.dailyCooldown = Date.now();
            doc.save();
          }
        } else {
          new client.db.Users({
            _id: interaction.member.id,
            dailyCooldown: Date.now(),
            coins: valueRandom,
          }).save();
        }
        interaction.reply({
          content: `Você resgatou ${valueRandom} coins no daily.`,
        });
      }
    );
  },
};
