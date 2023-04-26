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

export const ALL_COMMANDS = [SAY_HI];

registerCommands(process.env.APP_ID, ALL_COMMANDS);