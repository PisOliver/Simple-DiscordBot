const { QueueRepeatMode } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Allows to replay a song / queue')
        .addStringOption(option =>
            option.setName('repeatmode')
                .setDescription('The repeat mode you want to use: off / track / queue')
                .setRequired(true)),
    async execute(interaction) {
        const { client } = require('../../main');

        //Returning not in a voice channel error
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });

        //If the bot is in a different voice channel, returning it as a message
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        const queue = client.player.getQueue(interaction.guild);

        //Return error if a queue does not exist
        if (!queue || !queue.playing) return void interaction.FollowUp({ content: '❌ | No music is being played!' });

        const repeatModeInput = interaction.options.getString('repeatmode').toLowerCase();

        switch (repeatModeInput) {
            case 'off':
                queue.setRepeatMode(QueueRepeatMode.OFF);
                return await interaction.reply({ content: `🔁 | Repeat mode turned off!`});

            case 'track':
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                return await interaction.reply({ content: `🔂 | Repeating the current track!`});

            case 'queue':
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                return await interaction.reply({ content: `🔁 | Repeating the current queue!`});
        
            default:
                break;
        }
    }
}