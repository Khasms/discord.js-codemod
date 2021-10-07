const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'startTyping',
				},
			},
		})
		.forEach(({ node }) => {
			node.callee.property.name = 'sendTyping';
		});

	root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'stopTyping',
				},
			},
		})
		.remove();

	return root.toSource(printOptions);
};

module.exports.parser = parser;
