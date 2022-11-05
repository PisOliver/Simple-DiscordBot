const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the playback.'),
    async execute(interaction) {
        const {client} = require('../main');

        const queue = client.player.getQueue(interaction.guild);

        await interaction.deferReply();

        //Return error if a queue does not existing
        if(!queue || !queue.playing) return void interaction.FollowUp({content: '❌ | No music is being played!'});

        queue.destroy();

        return await interaction.followUp({content: '🛑 | Playback stopped!'});
    }
}