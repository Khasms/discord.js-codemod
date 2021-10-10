const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'delete',
				},
			},
		})
		.filter(({ node }) => {
			return node.arguments[node.arguments.length > 1 ? 1 : 0]?.properties?.some((prop) => prop.key.name === 'timeout');
		})
		.replaceWith(({ node }) => {
			const timeoutIndex = node.arguments.length > 1 ? 1 : 0;
			const timeout = node.arguments[timeoutIndex].properties.find((prop) => prop.key.name === 'timeout').value.value;
			timeoutIndex ? node.arguments.splice(timeoutIndex, 1) : (node.arguments = []);

			return j.callExpression(j.identifier('setTimeout'), [j.arrowFunctionExpression([], node), j.literal(timeout)]);
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
