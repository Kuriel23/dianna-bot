const { create, all } = require("mathjs");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("calculadora")
    .setDescription("Calcule um resultado.")
    .addStringOption((option) =>
      option
        .setName("expressão")
        .setNameLocalizations({ "pt-BR": "expressão", "en-US": "expression" })
        .setDescription("Identifique a expressão")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const expression = interaction.options.getString("expressão");
    const math = create(all);
    const limitedEvaluate = math.evaluate;

    math.import(
      {
        import: function () {
          throw new Error("A função import está desativada");
        },
        createUnit: function () {
          throw new Error("A função createUnit está desativada");
        },
        evaluate: function () {
          throw new Error("A função evaluate está desativada");
        },
        parse: function () {
          throw new Error("A função parse está desativada");
        },
        simplify: function () {
          throw new Error("A função simplify está desativada");
        },
        derivative: function () {
          throw new Error("A função derivative está desativada");
        },
        format: function () {
          throw new Error("A função format está desativada");
        },
      },
      { override: true }
    );

    const expr = expression.toLowerCase();

    let result;

    try {
      result = limitedEvaluate(expr);
    } catch (err) {
      return interaction.reply("❌ Expressão inválida!");
    }

    if (result === Infinity || result === -Infinity || isNaN(result))
      result = "Impossível determinar";
    if (typeof result === "function")
      return interaction.reply("❌ Expressão inválida!");

    const embed = new discord.EmbedBuilder()
      .setColor(client.cor)
      .setTitle("Calculadora")
      .addFields(
        { name: "Expressão", value: `\`\`\`${expression}\`\`\`` },
        { name: "Resultado", value: `\`\`\`${result}\`\`\`` }
      );

    interaction.reply({ embeds: [embed] });
  },
};
