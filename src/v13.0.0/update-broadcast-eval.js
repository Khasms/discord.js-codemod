const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'broadcastEval',
				},
			},
			arguments: [
				{
					type: 'Literal',
				},
			],
		})
		.forEach(({ node }) => {
			node.arguments[0] = j.arrowFunctionExpression(
				[j.identifier('client')],
				node.arguments[0].value.replaceAll('this', 'client'),
			);
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
