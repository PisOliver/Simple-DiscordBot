# Simple-DiscordBot
A simple Discord bot using the discord.js library

## Features

- Music Playback from Youtube 🎧

### Commands

| Command     | Description                              | Options               |
| :---        |    :----:                                |          ---:         |
| /echo       | Returns the text you entered             | \<text>               |
| /nowplaying | Returns the currently played song        |                       |
| /pause      | Pauses the playback                      |                       |
| /ping       | Returns pong! (For testing the bot)      |                       |
| /play       | Plays a song                             | \<songName>           |
| /stop       | Stops the playback, and clears the queue |                       |

## Used Libraries

- [discordjs](https://github.com/discordjs/discord.js) Discord JavaScript API
- [Androz2091/discord-player](https://github.com/Androz2091/discord-player) Music features library
- [FFmpeg](https://ffmpeg.org) for stream encoding

## Installation

### Docker

- Copy the **config_template.json** file as **config.json**, and fill it with the correct data
- Build the docker container using: `docker build . -t simple-discordbot`
- Start the docker container using: `docker run -d simple-discordbot`