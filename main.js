// Require the necessary node.js classes
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord classes
const { Client, Collection } = require('discord.js');
const { Player } = require("discord-player");
const { registerPlayerEvents } = require('./events/registerPlayerEvents');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ 
	intents: [
		"Guilds", 
		"GuildVoiceStates"]
	});

// Create a new player for playing music
client.player = new Player(client);
registerPlayerEvents(client.player);

//Loading the commands in
client.commands = new Collection();

//Filtering the command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const musicCommandsPath = path.join(__dirname, 'commands/music');
const musicCommandFiles = fs.readdirSync(musicCommandsPath).filter(file => file.endsWith('.js'));

// Going through the command files
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Going through the command files
for (const musicCommandFile of musicCommandFiles) {
	const filePath = path.join(musicCommandsPath, musicCommandFile);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Loading the events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

module.exports = {
	client
}

// Log in to Discord with your client's token
client.login(token);