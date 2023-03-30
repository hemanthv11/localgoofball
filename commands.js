const SAY_HI = {
    type: 1,
    name: 'hi',
    description: 'Says hi',
    options: [
        {
            type: 6,
            name: 'User',
            description: 'The user to say hi to',
            required: false,
            min_length: 1
        }
    ]

};

const SAY_BYE = {
    type: 1,
    name: 'bye',
    description: 'Says bye',
    options: [
        {
            type: 6,
            name: 'User',
            description: 'The user to say bye to',
            required: false,
            min_length: 1
        }
    ]
};

export const ALL_COMMANDS = [SAY_HI, SAY_BYE];