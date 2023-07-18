import {google} from 'googleapis'

export async function getAuthClient(){
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient()
    return client
}

/*******************/
/*
Username - string
Roll - string
Id - string
auth - boolean
sheetCount - integer
*/

class userObj{
    constructor(username, roll, id, auth){
        this.username = username
        this.roll = roll
        this.id = id
        this.auth = auth
        this.sheetCount = 0
    }
}

/*******************/

