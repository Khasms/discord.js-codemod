const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'kick',
				},
			},
		})
		.filter(({ node }) => {
			return node.callee.object.name === 'voice' || node.callee.object.property?.name === 'voice';
		})
		.replaceWith(({ node }) => {
			node.callee.property.name = 'disconnect';
			return node;
		})
		.toSource(printOptions);
};
