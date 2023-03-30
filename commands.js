const say_hi = {
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

const say_bye = {
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

export const ALL_COMMANDS = [say_hi, say_bye];