const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.MemberExpression, {
			property: {
				name: 'nsfw',
			},
		})
		.forEach(({ node }) => {
			node.property.name = 'nsfwLevel';
			return node;
		})
		.toSource(printOptions);
};
