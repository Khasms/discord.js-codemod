import Discord, {
	Permissions,
	ActivityFlags,
	ApplicationFlags,
	MessageFlags,
	SystemChannelFlags,
	UserFlags,
	Intents,
} from "discord.js";
Permissions.FLAGS.SEND_MESSAGES;
ActivityFlags.FLAGS.JOIN_REQUEST;
ApplicationFlags.FLAGS.GATEWAY_GUILD_MEMBERS;
MessageFlags.FLAGS.CROSSPOSTED;
SystemChannelFlags.FLAGS.SUPPRESS_JOIN_NOTIFICATIONS;
UserFlags.FLAGS.DISCORD_EMPLOYEE;
Intents.FLAGS.GUILDS;
