require('dotenv').config()
const fetch = require('node-fetch')
const {verifyKey} = require('discord-interactions')



export function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');
  
      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }

export async function DiscordRequest(endpoint, options) {
    const url = '${process.env.BOT_TOKEN}' + endpoint; //could break the code if the env variable is not set or retrieved properly
    if (options.body) options.body = JSON.stringify(options.body);
    const res = await fetch(url, {
        headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        },
        ...options
    });
    // throw API errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    return res;
}