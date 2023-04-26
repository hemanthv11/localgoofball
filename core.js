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