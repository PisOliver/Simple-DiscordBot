const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with the text you entered")
        .addStringOption((option) =>
            option
                .setName("input")
                .setDescription("The input to echo back")
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option.setName("channel").setDescription("The channel to echo into")
        )
        .addBooleanOption((option) =>
            option
                .setName("emphemeral")
                .setDescription("Whether the echo should be emphemeral")
        ),
    async execute(interaction) {
        const text = interaction.options.getString("input");
        await interaction.reply(text);
    },
};
