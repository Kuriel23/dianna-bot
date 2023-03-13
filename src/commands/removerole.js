const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("removerole")
    .setNameLocalizations({
      "pt-BR": "remover_cargo",
      "en-US": "removerole",
    })
    .setDescription("Remova o cargo de alguém")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("cargo")
        .setNameLocalizations({ "pt-BR": "cargo", "en-US": "role" })
        .setDescription("Identifique um cargo")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const role = interaction.options.getRole("cargo");
    if (interaction.member.roles.highest.position <= role.position)
      return interaction.reply({
        content:
          "Não tenho permissões para dar cargos com nível de administrador.",
        ephemeral: true,
      });
    await member.roles.remove(role).then(() => {
      return interaction.reply({
        content: `<@${member.id}> foi removido o cargo <@&${role.id}>.`,
        ephemeral: true,
      });
    });
  },
};
