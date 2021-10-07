const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.MemberExpression, {
			property: {
				name: 'MANAGE_EMOJIS',
			},
		})
		.forEach(({ node }) => {
			node.property.name = 'MANAGE_EMOJIS_AND_STICKERS';
			return node;
		})
		.toSource(printOptions);
};
