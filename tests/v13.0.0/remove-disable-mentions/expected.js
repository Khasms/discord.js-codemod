const client = new Discord.Client({ allowedMentions: { parse: ["roles", "users"], repliedUser: true } });
const client2 = new Discord.Client({ allowedMentions: { parse: [], repliedUser: false } });
