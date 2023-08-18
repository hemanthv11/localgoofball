import { InteractionType, InteractionResponseType } from 'discord-interactions'
import WebSocket from 'ws'
import {VerifyDiscordRequest} from './utils/requests.js'
import express from 'express'
import dotenv from 'dotenv'
import { registerCommands } from './utils/register.js'
import csv from 'csv-parser'	
import { ALL_COMMANDS } from './commands.js'
import {sayHi, getRoll, getDetails} from './core.js'
dotenv.config()
const app = express()
app.set('view engine', 'ejs')

/*
Request verification middleware
*/
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }))

/*
Opens a http server on port 3000
Discord requests are sent to '/interactions' endpoint
*/
app.post('/interactions', async function (req, res) {
	const { type, id, data, token, member } = req.body;
	/*
	Bot Ping Handler Middleware
	*/
    if (type === InteractionType.PING) {
    	return res.send({ type: InteractionResponseType.PONG })
    }
	/*
	Interaction Handler Middleware for each command
	*/
    if (type === InteractionType.APPLICATION_COMMAND) {
		console.log(req.body)
		if(data.name === 'sayhi') {
			let response;
			let interaction = req.body;
			response = sayHi(data, interaction);
			console.log('Response sent: <'+response+'>')
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: response,
				},
			});
		}
		else if(data.name === 'roll') {
			let response
			let interaction = req.body
			response = getRoll(data, interaction)
			if(data.options[1]){
				if(data.options[1].value === false) {
					console.log('Response sent: <'+response+'>')
					return res.send({
						type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
						data: {
							content: response,
						},
					});
				}
			}
			console.log('Response sent: <'+response+'>')
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: response,
					flags: 64
				},
			});
		}
		else if(data.name === 'rollsearch') {
			let response
			let interaction = req.body
			response = getDetails(data, interaction)
			if(!response){
				console.log('Response sent: <'+response+'>')
				return res.send({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: "User not registered",
						flags : 64
					},
				});
			} else{
				const embed = {
					description: "",
					mention: true,
					fields: [
					  {
						name: "Name:",
						value: response.name,
						inline: true,
					  },
					  {
						name: "Discord:",
						value: `<@${response.userid}>`,
						inline: true,
					  },
					  {
						name: "Roll:",
						value: data.options[0].value.toUpperCase(),
						inline: false,
					  },
					],
					title: "Roll search result:",
					color: 2789749,
					thumbnail: {
					  url:
						"https://cdn.discordapp.com/icons/1075458660056182946/589ea42311b9479b0cfdaa34cc8cec92.webp?size=128",
					},
					footer: {
					  text:
						"This information might be wrong. Please contact @risinglion for corrections.",
					},
				};
				if(data.options[1]){
					if(data.options[1].value === false) {
						console.log('Response sent')
						return res.send({
							type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
							data: {
								embeds: [embed],
							},
						});
					}
				}
				console.log('Response sent')
				return res.send({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						embeds: [embed],
						flags: 64
					},
				});
			}
		}
		else if(data.name === 'createpoll') {
			let response
			let interaction = req.body
			res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: "Poll created",
					flags: 64
				}
			})
		}
    }
})
/*
Port Listener
*/
app.listen(3000, () => {
    console.log('Listening on port 3000')
})