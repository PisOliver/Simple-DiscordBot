const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips one or more songs.')
        .addIntegerOption(option =>
            option.setName('numberoftracks')
                .setDescription('The count of songs you want to skip')
                .setRequired(false)),
    async execute(interaction) {
        const {client} = require('../../main');
        
        //Returning not in a voice channel error
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        //If the bot is in a different voice channel, returning it as a message
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        const queue = client.player.getQueue(interaction.guild);

        //Return error if a queue does not exist
        if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });

        const trackNum = interaction.options.getInteger('numberoftracks');

        if(trackNum) {
            await queue.skipTo(trackNum);
            return interaction.reply(`⏭️ | ${trackNum} songs skipped.`);
        } else {
            await queue.skip();
            return interaction.reply(`⏭️ | song skipped.`);
        }
    }
}