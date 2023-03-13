const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
  intents: 3276799,
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

const cores = ["#daa520", "#c0c0c0", "#008000", "#0000ff"];
const cor = cores[Math.floor(Math.random() * cores.length)];
client.cor = cor;
client.db = require("./database");
client.canais = {
  errors: "1047219857567010837",
  sugestoes: "",
};
client.embeds = {
  registro: new discord.EmbedBuilder()
    .setColor(client.cor)
    .setTitle("Registro no banco de dados efetuado")
    .setFooter({ text: "Tente novamente o comando." }),
};

process.on("unhandledRejection", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});

const boilerplateComponents = async () => {
  await require("./src/util/boilerplateClient")(client);
};

boilerplateComponents();
