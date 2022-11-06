const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the playback'),
    async execute(interaction) {
        const { client } = require('../../main');

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);

        //Return error if a queue does not exist
        if (!queue || !queue.playing) return void interaction.FollowUp({ content: '❌ | No music is being played!' });

        queue.setPaused(true);

        return void interaction.followUp({ content: `⏸️ | Playback paused!`});
    }
}