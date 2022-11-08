const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Lists the queue'),
    async execute(interaction) {
        const {client} = require('../../main');

        const queue = await client.player.getQueue(interaction.guild);

        await interaction.deferReply();

        //Return error if a queue does not exist
        if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | No music is being played!' });
        
        const tracks = queue.tracks.map((track,i) => {
            return `#${i+1}.: ${track.title} length:${track.length}`;
        });

        return interaction.followUp({
            embeds: [
                {
                    title: 'Queue',
                    description: `${tracks.join('\n')}`
                }
            ]
        })
    }
}