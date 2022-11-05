const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show the currently playing song!'),

    async execute(interaction) {

        const {client} = require('../../main');
        
        await interaction.deferReply();
        
        const queue = client.player.getQueue(interaction.guild);

        //Return error if a queue does not exist
        if (!queue || !queue.playing) return void interaction.FollowUp({ content: '❌ | No music is being played!' });

        return void interaction.followUp({ content: `🎶 | Now playing **${queue.current.title}**`});
    }
}