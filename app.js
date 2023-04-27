import { InteractionType, InteractionResponseType } from 'discord-interactions'
import WebSocket from 'ws'
import {VerifyDiscordRequest} from './utils/requests.js'
import express from 'express'
import dotenv from 'dotenv'
import { registerCommands } from './utils/register.js'
import csv from 'csv-parser'	
import { ALL_COMMANDS } from './commands.js'
import {sayHi, getRoll} from './core.js'
dotenv.config()
const app = express()
app.set('view engine', 'ejs')

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }))

app.post('/interactions', async function (req, res) {
	const { type, id, data, token, member } = req.body;
    if (type === InteractionType.PING) {
    	return res.send({ type: InteractionResponseType.PONG })
    }

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
			let response;
			let interaction = req.body;
			response = getRoll(data, interaction);
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
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})