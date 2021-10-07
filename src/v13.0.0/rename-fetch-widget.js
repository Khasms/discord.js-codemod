const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'fetchWidget',
				},
			},
		})
		.replaceWith(({ node }) => {
			node.callee.property.name = 'fetchWidgetSettings';
			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
