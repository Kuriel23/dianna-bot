const discord = require("discord.js");
const GoogleEngine = require("cdrake-se/Engines/Google");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("google")
    .setDescription("Pesquise algo no Google diretamente do discord.")
    .addStringOption((option) =>
      option
        .setName("pesquisa")
        .setNameLocalizations({ "pt-BR": "pesquisa", "en-US": "search" })
        .setDescription("Descreva sua pesquisa")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const pesquisa = interaction.options.getString("pesquisa");
    try {
      const Response = new GoogleEngine({
        Query: pesquisa,
        Page: 1,
        Language: "pt-BR",
      });
      const Search = await Response.Search();
      const emb = new discord.EmbedBuilder()
        .setColor(client.cor)
        .setTitle(`Resultados de Pesquisa para ${pesquisa} (${Search.SearchTimeout} segundos)`)
        .setDescription(
          Search.Results.map((result) => {
            return `[${result.Title}](${result.Link})`;
          }).join("\n\n")
        );
      interaction.reply({ embeds: [emb] });
    } catch (SearchRuntimeError) {
      console.log(SearchRuntimeError);
    }
  },
};
