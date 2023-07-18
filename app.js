import { InteractionType, InteractionResponseType } from 'discord-interactions'
import WebSocket from 'ws'
import {VerifyDiscordRequest} from './utils/requests.js'
import express from 'express'
import dotenv from 'dotenv'
import { registerCommands } from './utils/register.js'
import csv from 'csv-parser'	
import { ALL_COMMANDS } from './commands.js'
import {sayHi, getRoll, getDetails,createGSheet} from './core.js'
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
		else if(data.name === 'createsheet') {
			let response;
			let interaction = req.body;
			try{
				response = await createGSheet(data, interaction);
			} catch(err) {
				console.log(err);
				response = 'Error: '+err;
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
    }
})
/*
Port Listener
*/
app.listen(3000, () => {
    console.log('Listening on port 3000')
})