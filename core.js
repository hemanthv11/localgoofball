import csv from 'csv-parser'
import fs from 'fs'
import { createSheet } from './g_sheets.js';

/*
Function to quickly test the bot
*/
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
                let username = user.username;
                if(user.id == 754217406012063836)
                response = `Hello there, <@${userId}>! Ahem! I mean Femboy!`
                else if(user.id == 1024356476401221713)
                response = `<@${userId}> stay away from me! <:loid_dethstare:1037035828129562654>`
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
/*
Function to get roll number from user id
*/
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
/*
Function to search for a user with a given user id
Uses the S3CordMain.json file
userId is the primary key
*/
function getRollFromId(userId){
    const data = JSON.parse(fs.readFileSync('sheets/S3CordMain.json'))
    return data[userId]
}

/*
Function to search for a user details with a given roll number
Uses the RollUser.json file
roll is the primary key
*/
export function getDetails(data, interaction){
    const details = getDetailsFromRoll(data.options[0].value)
    if(details == undefined)
        return "Roll number not found"
    const embed = {
        "title": "Student Details",
        "description": "Details of the student",
        "color": 16711680,
        "fields": [
            {
                "name": "Name",
                "value": details.name,
                "inline": true
            },
            {
                "name": "Roll Number",
                "value": data.options[0].value,
                "inline": true
            }
        ],
        "footer": {
            "text": "This information might be wrong. Please contact @risinglion for corrections."
        }
    }
    return {embeds: [embed]}
}

/*
Function to search for a user with a given roll number
Uses the RollUser.json file
roll is the primary key
*/
function getDetailsFromRoll(roll){
    const data = JSON.parse(fs.readFileSync('sheets/RollUser.json'))
    return data[roll]
}

/*******************/
/*******WIP********/
export async function createGSheet(data, interaction){
    let x = await createSheet(data, interaction)
    if(x)
        return x
    else 
        return "Something went wrong while creating the sheet"
}
