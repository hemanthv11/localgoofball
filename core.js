import csv from 'csv-parser'
import fs from 'fs'


export function sayHi(data, interaction){
    let response
    if (!interaction.guild_id) {
        response = 'Hello there!';
    }
    else {
        if(data.resolved){
            if(data.resolved.users){
                const user = data.resolved.users[Object.keys(data.resolved.users)[0]];
                let userId = user.id;
                if(user.id == 754217406012063836)
                response = `Hello there, <@${userId}>! Ahem! I mean Femboy!`
                else
                response = `Hello there, <@${userId}>!`
            }
        }
        else{
            let userid = interaction.member.user.id;
            let username = interaction.member.user.username;
            response = 'Hello ' + username + '!';
        }
    }
    return response;
}

export function getRoll(data, interaction){
    let response = "Function returned nothing"
    let roll = 0
    if (!interaction.guild_id) {
        response = 'This function is out of scope for DMs'
    }
    else {
        if(data.resolved){
            if(data.resolved.users){
                const user = data.resolved.users[Object.keys(data.resolved.users)[0]];
                const username = user.username;
                let userId = user.id;
                roll = getRollFromId(userId)
                if(roll == undefined)
                    response = "User is not registered"
                else
                    response = `**Username: ** ${username}\n**Roll Number:** *${roll}*`
            }
        }
        else{
            response = "User is not registered"
        }
    }
    return response;
}

function getRollFromId(userId){
    const data = JSON.parse(fs.readFileSync('sheets/S3CordMain.json'))
    return data[userId]
}
