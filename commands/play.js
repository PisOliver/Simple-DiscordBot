const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The name of the song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        const { client } = require('../main.js');

        //Returning not in a voice channel error
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        //If the bot is in a different voice channel, returning it as a message
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        const query = interaction.options.getString("query");

        const currentqueue = await client.player.getQueue(interaction.guild);

        const queue = currentqueue ? currentqueue : await client.player.createQueue(interaction.guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        if (currentqueue) {
            queue.insert(track);
        } else {
            queue.play(track);
        }
        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });

    }
}
