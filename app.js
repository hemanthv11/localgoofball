const { InteractionType, InteractionResponseType } = require('discord-interactions');
const fs = require('fs');
const express = require('express');
const https = require('https')
require('dotenv').config()
const app = express()

const DISCORD_API = 'https://discord.com/api/v10'

