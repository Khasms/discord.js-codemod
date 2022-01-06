const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				object: {
					property: {
						name: 'users',
					},
				},
				property: {
					name: 'fetch',
				},
			},
			arguments: [
				{
					properties: [
						{
							key: {
								name: 'before',
							},
						},
					],
				},
			],
		})
		.replaceWith(({ node }) => {
			const props = node.arguments[0].properties;
			const before = props.find((prop) => prop.key.name === 'before');
			props.splice(props.indexOf(before), 1);
			if (props.length === 0) node.arguments = [];
			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
