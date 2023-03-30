//To register all commands with the discord API, we need to send a POST request to the Discord API with the following headers:

import dotenv from 'dotenv'
dotenv.config()
import {DiscordRequest} from './requests.js'
import {ALL_COMMANDS} from '../commands.js'

export async function registerCommands(appId, command) {
    //Create a new DiscordRequest object with the endpoint, method, and body.
    //endpoint means the url to send the request to.
    //appId is the application id of the bot.

    const endpoint = `applications/${appId}/commands`;

    //Creating a new DiscordRequest object with the endpoint, method, and body.
    const request = DiscordRequest(endpoint, 'POST', command)
    try {
        await DiscordRequest(endpoint, { method: 'PUT', body: command });
    } 
    catch (err) {
        console.error(err);
    }
}

//call the function with the application id and the commands to register.
registerCommands(process.env.APP_ID, ALL_COMMANDS)