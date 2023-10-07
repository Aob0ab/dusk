const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		let pingEmbed = new EmbedBuilder()
			.setColor("#64FE97")
			.setTitle(':ping_pong: Pong!')
			.setDescription(`The latency of the bot is ${Math.abs(Date.now() - interaction.createdTimestamp)}ms`)
			.setThumbnail('https://cdn.discordapp.com/emojis/606562687446679553.gif?size=48')
		await interaction.reply({ embeds: [pingEmbed], ephemeral: true });
	},
};