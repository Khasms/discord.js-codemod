const collector = message.createReactionCollector(filter, { time: 15000 });
const collector2 = message.createReactionCollector(filter2, { time: 15000 });
const reactions = await message.awaitReactions(filter, { time: 15000 });
const reactions2 = await message.awaitReactions(() => true, { time: 15000 });
const reactions3 = await message.awaitReactions(() => true);
