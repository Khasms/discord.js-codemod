const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.MemberExpression)
		.filter(({ node }) => {
			return [
				'afkChannelID',
				'applicationID',
				'channelID',
				'creatorID',
				'guildID',
				'lastMessageID',
				'ownerID',
				'parentID',
				'partyID',
				'processID',
				'publicUpdatesChannelID',
				'resolveID',
				'rulesChannelID',
				'sessionID',
				'shardID',
				'systemChannelID',
				'webhookID',
				'widgetChannelID',
				'workerID',
			].includes(node.property.name);
		})
		.forEach(({ node }) => {
			node.property.name = node.property.name.replace(/ID/g, 'Id');
			return node;
		})
		.toSource(printOptions);
};
