const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show the currently playing song!'),

    async execute(interaction) {

        const {client} = require('../main');
        
        await interaction.deferReply();
        
        const queue = client.player.getQueue(interaction.guild);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });

        return await interaction.followUp({ content: `🎶 | Now playing **${queue.current.title}**`});
    }
}