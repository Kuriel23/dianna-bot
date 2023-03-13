const { connect, Schema, model, set } = require("mongoose");
const { ChalkAdvanced } = require("chalk-advanced");
set("strictQuery", true);
connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
        "✅ • Carregado com sucesso [BANCO DE DADOS]"
      )}`
    )
  )
  .catch(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.red(
        "❎ • Conexão do banco de dados falhada"
      )}`
    )
  );

const userSchema = new Schema({
  _id: { type: String, required: true },
  coins: { type: Number, default: 0 },
  dailyCooldown: { type: Number, default: 0 },
});

module.exports.Users = model("Users", userSchema);
