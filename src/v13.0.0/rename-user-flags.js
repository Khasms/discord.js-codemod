const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	root
		.find(j.MemberExpression, {
			property: {
				name: 'DISCORD_PARTNER',
			},
		})
		.forEach(({ node }) => {
			node.property.name = 'PARTNERED_SERVER_OWNER';
			return node;
		});

	return root
		.find(j.MemberExpression, {
			property: {
				name: 'VERIFIED_DEVELOPER',
			},
		})
		.forEach(({ node }) => {
			node.property.name = 'EARLY_VERIFIED_BOT_DEVELOPER';
			return node;
		})
		.toSource(printOptions);
};
