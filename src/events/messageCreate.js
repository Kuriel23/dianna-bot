const discord = require("discord.js");
const path = "../messages/";

module.exports = async (client, message) => {
  if (message.guild === null) return;

  if (message.author.bot) return 0;

  if (message.guild.id === process.env.GUILD_ID) {
    if (message.author.id !== "354233941550694400") return;
    if (message.content.startsWith(`<@${client.user.id}>`)) {
      const embed = new discord.EmbedBuilder()
        .setTitle("For You Control - A fast and efficient control")
        .setDescription(
          "Controle a adesão de novos servidores, comandos de desenvolvimento tudo num menu de controlo rápido e eficiente!"
        )
        .setColor(client.cor);
      const row = new discord.ActionRowBuilder().addComponents(
        new discord.StringSelectMenuBuilder()
          .setCustomId("control")
          .setPlaceholder("Controle tudo imediatamente!")
          .addOptions({
            label: "Faça evaluate de um código (dev only)",
            description: "Cuidado isto pode ser perigoso!",
            value: "eval",
            emoji: "1026116730969395311",
          })
      );
      message.reply({ embeds: [embed], components: [row] });
    }
  }
};
