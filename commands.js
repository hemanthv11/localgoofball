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
    }],
};

export const ALL_COMMANDS = [SAY_HI, GET_ROLL];

registerCommands(process.env.APP_ID, ALL_COMMANDS);