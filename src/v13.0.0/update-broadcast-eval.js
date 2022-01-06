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
			let arg = node.arguments[0];
			const value = arg.value.replaceAll('this', 'client');
			arg = j.arrowFunctionExpression([j.identifier('client')], j.blockStatement([]));
			arg.body = value;
			node.arguments[0] = arg;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
