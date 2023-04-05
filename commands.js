import { registerCommands } from "./utils/register.js";

const SAY_HI = {
    name: 'sayhi',
    description: 'Basic command',
    type: 1,
};

const SAY_BYE = {
    name: 'saybye',
    description: 'Basic command',
    type: 1,
};

export const ALL_COMMANDS = [SAY_HI, SAY_BYE];

registerCommands(process.env.APP_ID, ALL_COMMANDS);