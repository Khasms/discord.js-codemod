const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'create',
				},
			},
			arguments: [
				{
					type: 'ObjectExpression',
					properties: [
						{
							key: {
								name: 'data',
							},
						},
					],
				},
			],
		})
		.forEach(({ node }) => {
			const reason = node.arguments[1];
			const newProp = j.objectExpression(node.arguments[0].properties[0].value.properties);
			if (reason) {
				const reasonProp = j.property('init', j.identifier('reason'), reason);
				newProp.properties.push(reasonProp);
			}
			node.arguments = [newProp];
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
