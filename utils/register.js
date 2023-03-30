//To register all commands with the discord API, we need to send a POST request to the Discord API with the following headers:

require('dotenv').config()
const {DiscordRequest} = require('./request.js')
const ALL_COMMANDS = require('../commands.js')

export async function registerCommands(appId, command) {
    //Create a new DiscordRequest object with the endpoint, method, and body.
    //endpoint means the url to send the request to.
    //appId is the application id of the bot.

    const endpoint = `${process.env.DISCORD_API}/applications/${appId}/commands`

    //Creating a new DiscordRequest object with the endpoint, method, and body.

    const request = new DiscordRequest(endpoint, 'POST', command)
    try{
        //request is an object that contains the endpoint, method, and body.
        const response = await request.send()
        /* The above line awaits the response from the Discord API.*/
        console.log(response)
    }
    catch(err){
        console.log(err)
    }
}

//call the function with the application id and the commands to register.
registerCommands(process.env.APP_ID, ALL_COMMANDS)