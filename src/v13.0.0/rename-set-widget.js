const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'setWidget',
				},
			},
		})
		.replaceWith(({ node }) => {
			node.callee.property.name = 'setWidgetSettings';
			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
