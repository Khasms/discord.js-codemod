const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				object: {
					name: 'users',
				},
				property: {
					name: 'fetch',
				},
			},
			arguments: [
				{
					type: 'ObjectExpression',
					properties: [
						{
							type: 'Property',
							key: {
								name: 'before',
							},
						},
					],
				},
			],
		})
		.replaceWith(({ node }) => {
			const beforeIndex = node.arguments.length > 1 ? 1 : 0;
			const props = node.arguments[beforeIndex].properties;
			const before = props.find((prop) => prop.key.name === 'before');
			props.splice(props.indexOf(before), 1);

			if (props.length === 0) node.arguments = [];

			return node;
		})
		.toSource(printOptions);
};
