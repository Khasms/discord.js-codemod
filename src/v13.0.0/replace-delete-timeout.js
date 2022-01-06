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
			arguments: [
				{
					properties: [
						{
							key: {
								name: 'timeout',
							},
						},
					],
				},
			],
		})
		.replaceWith(({ node }) => {
			const timeout = node.arguments[0].properties.find((prop) => prop.key.name === 'timeout').value.value;
			node.arguments = [];

			return j.callExpression(j.identifier('setTimeout'), [j.arrowFunctionExpression([], node), j.literal(timeout)]);
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
