//To register all commands with the discord API, we need to send a POST request to the Discord API with the following headers:

import dotenv from 'dotenv'
dotenv.config()
import {DiscordRequest} from './requests.js'

export async function registerCommands(appId, command) {
    //Create a new DiscordRequest object with the endpoint, method, and body.
    //endpoint means the url to send the request to.
    //appId is the application id of the bot.

    const endpoint = 'applications/'+appId+'/commands';

    //Creating a new DiscordRequest object with the endpoint, method, and body.
    try {
        await DiscordRequest(endpoint, { method: 'PUT', body: command })
    } 
    catch (err) {
        console.error(err);
    }
}