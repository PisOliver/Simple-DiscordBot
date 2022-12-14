# Simple-DiscordBot
A simple Discord bot using the discord.js library

## Features

- Music Playback from Youtube 🎧

### Commands

| Command     | Description                              | Options               |
| :---        |    :----:                                |          ---:         |
| /back       | Plays the previous song                  |                       |
| /clear      | Clears the queue                         |                       |
| /nowplaying | Returns the currently played song        |                       |
| /pause      | Pauses the playback                      |                       |
| /ping       | Returns pong! (For testing the bot)      |                       |
| /play       | Plays a song                             | \<songName>           |
| /queue      | Lists the queue                          |                       |
| /resume     | Resumes the playback                     |                       |
| /repeat     | Sets the repeat mode                     | \<repeatMode>         |
| /skip       | Skips one or more songs                  | \<numberOfTracks>     |
| /stop       | Stops the playback, and clears the queue |                       |

## Used Libraries

- [discordjs](https://github.com/discordjs/discord.js) Discord JavaScript API
- [Androz2091/discord-player](https://github.com/Androz2091/discord-player) Music features library
- [@discordjs/opus](https://github.com/discordjs/opus) for Opus support
- [eugeneware/ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) for node FFmpeg libraries
- [FFmpeg](https://ffmpeg.org) for stream encoding

## Installation

### Manual Install

- Install [FFmpeg](https://ffmpeg.org)
- Clone this repository: `git clone https://github.com/PisOliver/Simple-Discordbot`
- Install dependencies using: `npm install`
- Copy the **config_template.json** file as **config.json**, and fill it with the correct data
- Deploy the commands using `node deploy-commands.js`
- Start the bot using `node main.js`

### Docker

- Copy the **config_template.json** file as **config.json**, and fill it with the correct data
- Build the docker container using: `docker build . -t simple-discordbot`
- Start the docker container using: `docker run -d simple-discordbot`