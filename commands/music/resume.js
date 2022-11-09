const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the playback'),
    async execute(interaction) {
        const { client } = require('../../main');

        //Returning not in a voice channel error
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });

        //If the bot is in a different voice channel, returning it as a message
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guild);

        //Return error if a queue does not exist
        if (!queue) return void interaction.FollowUp({ content: '❌ | No music is being played!' });

        queue.setPaused(false);

        return void interaction.followUp({ content: `▶️ | Playback resumed!` });
    }
}