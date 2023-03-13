const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("transferir")
    .setNameLocalizations({ "pt-BR": "transferir", "en-US": "transfer" })
    .setDescription("Ofereça moedas a outro utilizador.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("dinheiro")
        .setNameLocalizations({ "pt-BR": "dinheiro", "en-US": "money" })
        .setDescription("Identifique o dinheiro a ser oferecido")
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction, client) {
    const transferido = interaction.options.getMember("usuário");
    const dinheiro2 = interaction.options.getInteger("dinheiro");
    if (
      !transferido ||
      transferido.user.bot ||
      transferido.id === interaction.member.id
    )
      return interaction.reply({
        content: "Não foi encontrado esse usuário...",
        ephemeral: true,
      });
    const doc = await client.db.Users.findOne(
      { _id: interaction.member.id })
        if (doc) {
          if (doc.coins < dinheiro2) {
            return interaction.reply({
              embeds: [
                new discord.EmbedBuilder()
                  .setAuthor({ name: "Sem Dinheiro." })
                  .setColor(client.cor),
              ],
            });
          }
          doc.coins -= dinheiro2;
          doc.save();
          interaction.reply({
            embeds: [
              new discord.EmbedBuilder()
                .setAuthor({
                  name: `${interaction.member.user.tag} deu ${dinheiro2} para o ${transferido.user.tag}!`,
                  iconURL: "https://i.imgur.com/PVt947i.png",
                })
                .setColor(client.cor),
            ],
          });
          if (!doc) {
            new client.db.Users({ _id: interaction.member.id }).save();
            return interaction.reply({
              embeds: [client.msg.embeds.registro],
            });
          }
          const doc2 = await client.db.Users.findOne({ _id: transferido.id })
            if (doc2) {
              doc2.coins += dinheiro2;
              doc2.save();
            }
            if (!doc2) {
              const docToSave = new client.db.Users({
                _id: transferido.id,
                coins: dinheiro2,
              }).save();
              return interaction.reply({
                embeds: [client.embeds.registro],
              });
            }
        }
  },
};
