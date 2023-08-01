import { registerCommands } from "./utils/register.js";

const SAY_HI = {
    name: 'sayhi',
    description: 'Say hello to a user',
    type: 1,
    nsfw: false,
    options: [{
        name: 'input',
        description: 'User to say hello to',
        type: 9,
        required: false,
    }],
};

const GET_ROLL = {
    name: 'roll',
    description: 'Gets roll number of a user',
    type: 1,
    nsfw: false,
    options: [{
            name: 'user',
            description: 'User to get roll number of',
            type: 9,
            required: true,
        },
        {
            name: 'visibility',
            description: 'Hide the output from others? Default value is true',
            type: 5,
            required: false,
        }
    ],
};

const ROLL_SEARCH = {
    name: 'rollsearch',
    description: 'Searches for a user with a given roll number',
    type: 1,
    nsfw: false,
    options: [{
            name: 'roll',
            description: 'Roll number to search for',
            type: 4,
            required: true,
        },
        {
            name: 'visibility',
            description: 'Hide the output from others? Default value is true',
            type: 5,
            required: false,
        }
    ],
};

const CREATE_POLL = {
    name: 'createpoll',
    description: 'Creates a poll',
    type: 1,
    nsfw: false,
    options: [{
            name: 'question',
            description: 'Question to ask',
            type: 3,
            required: true,
        },
        {
            name: 'simplepoll',
            description: 'Stores data in an individual user level',
            type: 5,
            required: true,
        },
        {
            name: 'statisticspoll',
            description: 'Stores data in a server level',
            type: 5,
            required: true,
        }
    ],
};

export const ALL_COMMANDS = [SAY_HI, GET_ROLL, ROLL_SEARCH, CREATE_POLL];

registerCommands(process.env.APP_ID, ALL_COMMANDS);