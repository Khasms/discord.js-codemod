<div align='center'>
  <h1>discord.js-codemod</h1>
  <p>
    <a href="https://www.npmjs.com/package/discord.js-codemod"><img src="https://img.shields.io/npm/v/discord.js-codemod.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-codemod"><img src="https://img.shields.io/npm/dt/discord.js-codemod.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>

Some codemods for [discord.js](https://github.com/discordjs/discord.js).

Uses [jscodeshift](https://github.com/facebook/jscodeshift) to do most of the work in updating your discord.js codebase.

> **Disclaimer**
> This script does it's best to update your codebase in a way that is not breaking, but some transformers, such as `rename-fetch-vanity-code`, replace the old methods with new methods that function slightly different from the old method, in which case you will still need to do some updating manually. The relevant section from the official discord.js update guide will be linked under every transformer.

## Table of Contents

- [Usage](#usage)
  - [JSCodeShift Options](#jscodeshift-options)
  - [Recast Options](#recast-options)
- [Available Transformers](#available-transformers)
  - [v13.0.0](#v13.0.0)

## Usage

```bash
$ npx discord.js-codemod <codemod> <paths...>

Applies a `discord.js-codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                [string]
  paths    Paths to run on                                        [string]

Options:
  --version   Show version number                                [boolean]
  --help      Show help                                          [boolean]
  --dry       Dry run (no changes are made to files)
                                                [boolean] [default: false]
  --print     Print transformed files to stdout, useful for development
                                                [boolean] [default: false]
  --jscodeshift                                  [string] [default: false]

Examples:
$ npx discord.js-codemod v13.0.0/move-intents src
$ npx discord.js-codemod v13.0.0/all src/commands src/events --dry
```

### JSCodeShift Options

To pass more options directly to jscodeshift, use `--jscodeshift="..."`. For example:

```sh
npx discord.js-codemod --jscodeshift="--run-in-band --verbose=2"
```

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided through jscodeshift's `printOptions` command line argument. For example:

```sh
npx discord.js-codemod --jscodeshift="--printOptions='{\"quote\":\"double\"}'"
```

## Available Transformers

### v13.0.0

#### `all`

Runs every transformer for updating from v12 to v13.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html)

```sh
npx discord.js-codemod v13.0.0/all <paths...>
```

Includes the following transformers:

- [`move-ban-reason`](#move-ban-reason)
- [`move-filter`](#move-filter)
- [`move-intents`](#move-intents)
- [`move-respawn-params`](#move-respawn-params)
- [`move-webhook-client-params`](#move-webhook-client-params)
- [`recase-id`](#recase-id)
- [`remove-fetch-all-members`](#remove-fetch-all-members)
- [`remove-message-delete-reason`](#remove-message-delete-reason)
- [`remove-message-edit-history`](#remove-message-edit-history)
- [`remove-resolve-string`](#remove-resolve-string)
- [`remove-user-fetch-before`](#remove-user-fetch-before)
- [`rename-activity-type`](#rename-activity-type)
- [`rename-api-message`](#rename-api-message)
- [`rename-fetch-vanity-code`](#rename-fetch-vanity-code)
- [`rename-fetch-widget`](#rename-fetch-widget)
- [`rename-manage-emojis`](#rename-manage-emojis)
- [`rename-message-event`](#rename-message-event)
- [`rename-nsfw`](#rename-nsfw)
- [`rename-set-widget`](#rename-set-widget)
- [`rename-user-flags`](#rename-user-flags)
- [`rename-voice-kick`](#rename-voice-kick)
- [`replace-buffer`](#replace-buffer)
- [`replace-collection-array`](#replace-collection-array)
- [`replace-delete-timeout`](#replace-delete-timeout)
- [`replace-fetch-application`](#replace-fetch-application)
- [`update-add-member`](#update-add-member)
- [`update-broadcast-eval`](#update-broadcast-eval)
- [`update-channel-types`](#update-channel-types)
- [`update-create-overwrite`](#update-create-overwrite)
- [`update-create-role`](#update-create-role)
- [`update-fetch-ban`](#update-fetch-ban)
- [`update-fetch-invites`](#update-fetch-invites)
- [`update-generate-invite`](#update-generate-invite)
- [`update-has-permission`](#update-has-permission)
- [`update-member`](#update-member)
- [`update-overwrite-permissions`](#update-overwrite-permissions)
- [`update-owner`](#update-owner)
- [`update-respawn-all`](#update-respawn-all)
- [`update-set-presence`](#update-set-presence)
- [`update-spawn`](#update-spawn)
- [`update-to-flags`](#update-to-flags)
- [`update-typing`](#update-typing)
- [`update-update-overwrite`](#update-update-overwrite)

#### `move-ban-reason`

Moves the ban reason into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guildmember-ban)

```diff
- member.ban('reason')
+ member.ban({ reason: 'reason' })
```

```sh
npx discord.js-codemod v13.0.0/move-ban-reason <paths...>
```

#### `move-filter`

Moves collector filters into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#collectors)

```diff
- const collector = message.createReactionCollector(filter, { time: 15000 });
+ const collector = message.createReactionCollector({ filter, time: 15000 });

- const reactions = await message.awaitReactions(filter, { time: 15000 });
+ const reactions = await message.awaitReactions({ filter, time: 15000 });
```

```sh
npx discord.js-codemod v13.0.0/move-filter <paths...>
```

#### `move-intents`

Moves intents out of the `ws` property.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#intents)

```diff
- const client = new Client({ ws: { intents: [Intents.FLAGS.GUILDS] } });
+ const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
```

```sh
npx discord.js-codemod v13.0.0/move-intents <paths...>
```

#### `move-respawn-params`

Moves `Shard#respawn` parameters into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#shard-respawn)

```diff
- shard.respawn(500, 30000);
+ shard.respawn({ delay: 500, timeout: 30000 });
```

```sh
npx discord.js-codemod v13.0.0/move-respawn-params <paths...>
```

#### `move-webhook-client-params`

Moves `WebhookClient` id and token parameters into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#webhookclient)

```diff
- new WebhookClient(id, token, options);
+ new WebhookClient({ id, token }, options);
```

```sh
npx discord.js-codemod v13.0.0/move-webhook-client-params <paths...>
```

#### `recase-id`

Updates all uses of discord.js properties containing `ID` to use `Id`. See the guide for the full list of properties affected.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#thing-thingid)

```diff
- console.log(guild.ownerID);
+ console.log(guild.ownerId);
```

```sh
npx discord.js-codemod v13.0.0/recase-id <paths...>
```

#### `remove-fetch-all-members`

Removes the `fetchAllMembers` client option.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#clientoptions-fetchallmembers)

```diff
- new Client({ fetchAllMembers: true, ...options });
+ new Client({ ...options });
```

```sh
npx discord.js-codemod v13.0.0/remove-fetch-all-members <paths...>
```

#### `remove-message-delete-reason`

Removes the `reason` option from `Message#delete` and `MessageManager#delete`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#message-delete)

```diff
- message.delete({ reason: '' });
+ message.delete();
```

```sh
npx discord.js-codemod v13.0.0/remove-message-delete-reason <paths...>
```

#### `remove-message-edit-history`

Removes the `messageEditHistoryMaxSize` client option.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#clientoptions-messageedithistorymaxsize)

```diff
- new Client({ messageEditHistoryMaxSize: 5, ...options });
+ new Client({ ...options });
```

```sh
npx discord.js-codemod v13.0.0/remove-message-edit-history <paths...>
```

#### `remove-resolve-string`

Removes `Util.resolveString`. Discord.js now enforces many of its methods are passed strings instead of resolving to one as before. This is something the script is unable to update.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#util-resolvestring)

```sh
npx discord.js-codemod v13.0.0/remove-resolve-string <paths...>
```

#### `remove-user-fetch-before`

Removes the `before` option from `ReactionUserManager#fetch`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#reactionusermanager-fetch)

```diff
- reaction.users.fetch({ before: '123456789987654321' });
+ reaction.users.fetch();
```

```sh
npx discord.js-codemod v13.0.0/remove-user-fetch-before <paths...>
```

#### `rename-activity-type`

Renames `CUSTOM_STATUS` to `CUSTOM`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#activitytype)

```sh
npx discord.js-codemod v13.0.0/rename-activity-type <paths...>
```

#### `rename-api-message`

Renames `APIMessage` to `MessagePayload`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#apimessage)

```diff
- APIMessage.create();
+ MessagePayload.create();
```

```sh
npx discord.js-codemod v13.0.0/rename-api-message <paths...>
```

#### `rename-fetch-vanity-code`

Replaces `Guild#fetchVanityCode` with `Guild#fetchVanityData`. You must manually update your code to handle the different return.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-fetchvanitycode)

```diff
- Guild.fetchVanityCode().then(code => console.log(`Vanity URL: https://discord.gg/${code}`));
+ Guild.fetchVanityData().then(res => console.log(`Vanity URL: https://discord.gg/${res.code} with ${res.uses} uses`));
```

```sh
npx discord.js-codemod v13.0.0/rename-fetch-vanity-code <paths...>
```

#### `rename-fetch-widget`

Replaces `Guild#fetchWidget` with `Guild#fetchWidgetSettings`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-fetchwidget)

```diff
- guild.fetchWidget();
+ guild.fetchWidgetSettings();
```

```sh
npx discord.js-codemod v13.0.0/rename-fetch-widget <paths...>
```

#### `rename-manage-emojis`

Replaces `MANAGE_EMOJIS` with `MANAGE_EMOJIS_AND_STICKERS`
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#permissions-flags-manage-emojis)

```diff
- Permissions.FLAGS.MANAGE_EMOJIS;
+ Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS;
```

```sh
npx discord.js-codemod v13.0.0/rename-manage-emojis <paths...>
```

#### `rename-message-event`

Replaces the `message` client event with `messageCreate`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#client-message)

```diff
- client.on("message", message => { ... });
+ client.on("messageCreate", message => { ... });
```

```sh
npx discord.js-codemod v13.0.0/rename-message-event <paths...>
```

#### `rename-nsfw`

Replaces `Guild#nsfw` with `Guild#nsfwLevel`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-nsfw)

```diff
- guild.nsfw;
+ guild.nsfwLevel;
```

```sh
npx discord.js-codemod v13.0.0/rename-nsfw <paths...>
```

#### `rename-set-widget`

Replaces `Guild#setWidget` with `Guild#setWidgetSettings`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-setwidget)

```diff
- guild.setWidget();
+ guild.setWidgetSettings();
```

```sh
npx discord.js-codemod v13.0.0/rename-set-widget <paths...>
```

#### `rename-user-flags`

Replaces `DISCORD_PARTNER` with `PARTNERED_SERVER_OWNER` and `VERIFIED_DEVELOPER` with `EARLY_VERIFIED_BOT_DEVELOPER`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#userflags)

```diff
- user.flags.has(UserFlags.FLAGS.DISCORD_PARTNER)
+ user.flags.has(UserFlags.FLAGS.PARTNERED_SERVER_OWNER)

- user.flags.has(UserFlags.FLAGS.VERIFIED_DEVELOPER)
+ user.flags.has(UserFlags.FLAGS.EARLY_VERIFIED_BOT_DEVELOPER)
```

```sh
npx discord.js-codemod v13.0.0/rename-user-flags <paths...>
```

#### `rename-voice-kick`

Replaces `VoiceState#kick` with `VoiceState#disconnect`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#voicestate-kick)

```diff
- member.voice.kick();
+ member.voice.disconnect();
```

```sh
npx discord.js-codemod v13.0.0/rename-voice-kick <paths...>
```

#### `replace-buffer`

Replaces `Util.convertToBuffer` and `Util.str2ab` with `Buffer.from`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#util-converttobuffer)

```diff
- Util.convertToBuffer('input');
- Util.str2ab('input');
+ Buffer.from('input');
```

```sh
npx discord.js-codemod v13.0.0/replace-buffer <paths...>
```

#### `replace-collection-array`

Replaces `Collection#array` and `Collection#keyArray` with equivalents.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#collection-array)

```diff
- collection.array();
+ [...collection.values()];

- collection.keyArray();
+ [...collection.keys()];
```

```sh
npx discord.js-codemod v13.0.0/replace-collection-array <paths...>
```

#### `replace-delete-timeout`

Replaces the `timeout` option with an equivalent.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#message-delete)

```diff
- message.delete({ timeout: 10000 });
+ setTimeout(() => message.delete(), 10000);
```

```sh
npx discord.js-codemod v13.0.0/replace-delete-timeout <paths...>
```

#### `replace-fetch-application`

Replaces `Client#fetchApplication` with `Client#application`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#client-fetchapplication)

```diff
- client.fetchApplication().then(application => application.name);
+ client.application.name;
```

```sh
npx discord.js-codemod v13.0.0/replace-fetch-application <paths...>
```

#### `update-add-member`

Replaces `Guild#addMember` with `GuildMemberManager#add`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-addmember)

```diff
- guild.addMember(user, { accessToken: token });
+ guild.members.add(user, { accessToken: token });
```

```sh
npx discord.js-codemod v13.0.0/update-add-member <paths...>
```

#### `update-broadcast-eval`

Replaces the input of `ShardClientUtil#broadcastEval` with a function.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#shardclientutil-broadcasteval)

```diff
- client.shard.broadcastEval('this.guilds.cache.size')
+ client.shard.broadcastEval(client => client.guilds.cache.size);
```

```sh
npx discord.js-codemod v13.0.0/update-broadcast-eval <paths...>
```

#### `update-channel-types`

Replaces channel types with the updated versions.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#channel-type)

```diff
- if(channel.type === 'text') channel.send('Content');
+ if(channel.type === 'GUILD_TEXT') channel.send('Content');
```

```sh
npx discord.js-codemod v13.0.0/update-channel-types <paths...>
```

#### `update-create-overwrite`

Replaces `GuildChannel#createOverwrite` with `PermissionOverwriteManager#create`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guildchannel-createoverwrite)

```diff
- channel.createOverwrite(user, { VIEW_CHANNEL: false });
+ channel.permissionOverwrites.create(user, { VIEW_CHANNEL: false });
```

```sh
npx discord.js-codemod v13.0.0/update-create-overwrite <paths...>
```

#### `update-create-role`

Unnests the role data and adds the `reason` parameter to the object in `RoleManager#create`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#rolemanager-create)

```diff
- guild.roles.create({ data: { name: "New role" } }, "Creating new role");
+ guild.roles.create({ name: "New role", reason: "Creating new role" })
```

```sh
npx discord.js-codemod v13.0.0/update-create-role <paths...>
```

#### `update-fetch-ban`

Replaces `Guild#fetchBan` and `Guild#fetchBans` with `GuildBanManager#fetch`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-fetchban)

```diff
- guild.fetchBan(user);
+ guild.bans.fetch(user);

- guild.fetchBans();
+ guild.bans.fetch();
```

```sh
npx discord.js-codemod v13.0.0/update-fetch-ban <paths...>
```

#### `update-fetch-invites`

Replaces `Guild#fetchInvites` with `GuildInviteManager#fetch`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-fetchinvites)

```diff
- guild.fetchInvites();
+ guild.invites.fetch();
```

```sh
npx discord.js-codemod v13.0.0/update-fetch-invites <paths...>
```

#### `update-generate-invite`

Moves the `permissions` parameter into an object. Discord.js requires providing either the `bot` or `applications.commands` scope, which you will have to do manually.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#client-generateinvite)

```diff
- client.generateInvite([Permissions.FLAGS.SEND_MESSAGES]);
+ client.generateInvite({ scopes: ['bot'], permissions: [Permissions.FLAGS.SEND_MESSAGES] });
```

```sh
npx discord.js-codemod v13.0.0/update-generate-invite <paths...>
```

#### `update-has-permission`

Replaces `GuildMember#hasPermission` with `Permissions#has`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guildmember-haspermission)

```diff
- member.hasPermission(Permissions.FLAGS.SEND_MESSAGES);
+ member.permissions.has(Permissions.FLAGS.SEND_MESSAGES);
```

```sh
npx discord.js-codemod v13.0.0/update-has-permission <paths...>
```

#### `update-member`

Replaces `Guild#member` with `GuildMemberManager#resolve`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-member)

```diff
- guild.member(user);
+ guild.members.resolve(user);
```

```sh
npx discord.js-codemod v13.0.0/update-member <paths...>
```

#### `update-overwrite-permissions`

Replaces `GuildChannel#overwritePermissions` with `PermissionOverwriteManager#set`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guildchannel-overwritepermissions)

```diff
- channel.overwritePermissions([{ id: user.id , allow: ['VIEW_CHANNEL'], deny: ['SEND_MESSAGES'] }]);
+ channel.permissionOverwrites.set([{ id: user.id , allow: ['VIEW_CHANNEL'], deny: ['SEND_MESSAGES'] }]);
```

```sh
npx discord.js-codemod v13.0.0/update-overwrite-permissions <paths...>
```

#### `update-owner`

Replaces `Guild#owner` with `Guild#fetchOwner` or `Guild#ownerId`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guild-owner)

```diff
- console.log(guild.owner);
+ guild.fetchOwner().then(console.log);

- guild.owner.id;
+ guild.ownerId;
```

```sh
npx discord.js-codemod v13.0.0/update-owner <paths...>
```

#### `update-respawn-all`

Moves `ShardClientUtil#respawnAll` parameters into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#shardclientutil-respawnall)

```diff
- client.shard.respawnAll(5000, 500, 30000);
+ client.shard.respawnAll({ shardDelay: 5000, respawnDelay: 500, timeout: 30000 });
```

```sh
npx discord.js-codemod v13.0.0/update-respawn-all <paths...>
```

#### `update-set-presence`

Moved `activity` into an array called `activities`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setpresence)

```diff
- client.user.setPresence({ activity: { name: 'with discord.js' } });
+ client.user.setPresence({ activities: [{ name: 'with discord.js' }] });
```

```sh
npx discord.js-codemod v13.0.0/update-set-presence <paths...>
```

#### `update-spawn`

Moves `ShardingManager#spawn` parameters into an object.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#shardingmanager-spawn)

```diff
- manager.spawn('auto', 5500, 30000);
+ manager.spawn({ amount: 'auto', delay: 5500, timeout: 30000 });
```

```sh
npx discord.js-codemod v13.0.0/update-spawn <paths...>
```

#### `update-to-flags`

Changes string literals for bitfield flags to use flags instead.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#bitfields-permissions)

```diff
- permissions.has('SEND_MESSAGES')
+ permissions.has(Permissions.FLAGS.SEND_MESSAGES)
```

```sh
npx discord.js-codemod v13.0.0/update-to-flags <paths...>
```

#### `update-typing`

Changes `TextChannel#startTyping` with `TextChannel#sendTyping` and removes `TextChannel#stopTyping`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#textchannel-starttyping)

```diff
- channel.startTyping();
- wait(10_000);
- channel.stopTyping();
+ channel.sendTyping();
```

```sh
npx discord.js-codemod v13.0.0/update-typing <paths...>
```

#### `update-update-overwrite`

Replaces `GuildChannel#updateOverwrite` with `PermissionOverwriteManager#edit`.
**Links:** [Discord.js Guide](https://discordjs.guide/additional-info/changes-in-v13.html#guildchannel-updateoverwrite)

```diff
- channel.updateOverwrite(user, { VIEW_CHANNEL: false });
+ channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: false });
```

```sh
npx discord.js-codemod v13.0.0/update-update-overwrite <paths...>
```
