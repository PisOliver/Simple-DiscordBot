const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('playyt')
    .setDescription('Plays the video on the entered link from youtube')
    .addStringOption(option => 
        option.setName('link')
            .setDescription('The link you want to play')
            .setRequired(true)),
    async execute(interaction) {

    }
}