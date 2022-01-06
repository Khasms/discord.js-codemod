const collector = message.createReactionCollector({ time: 15000, filter });
const collector2 = message.createReactionCollector({ time: 15000, filter: filter2 });
const reactions = await message.awaitReactions({ time: 15000, filter });
const reactions2 = await message.awaitReactions({ time: 15000, filter: () => true });
const reactions3 = await message.awaitReactions({ filter: () => true });
