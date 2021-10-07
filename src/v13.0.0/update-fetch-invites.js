const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'fetchInvites',
				},
			},
		})
		.forEach(({ node }) => {
			node.callee.property.name = 'invites.fetch';
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
