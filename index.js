// imports
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json')
const path = require('node:path');
const fs = require('node:fs');

// create client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// create commands collection
client.commands = new Collection();

// command handler
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`);

	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`)
		if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		}
	}
}

// event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login
client.login(token);