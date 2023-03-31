import { InteractionType, InteractionResponseType } from 'discord-interactions'
import {VerifyDiscordRequest} from './utils/requests.js'
import fs from 'fs'
import express from 'express'
import https from 'https'
import dotenv from 'dotenv'
import { registerCommands } from './utils/register.js'
import { ALL_COMMANDS } from './commands.js'
dotenv.config()
const app = express()
app.set('view engine', 'ejs')

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }))

app.post('/interaction', async function (req, res) {
    const { type, id, data, token, member } = req.body;
  
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }
  
    if (type === InteractionType.APPLICATION_COMMAND) {
      console.log(data);
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
	registerCommands(process.env.APP_ID, ALL_COMMANDS);
})