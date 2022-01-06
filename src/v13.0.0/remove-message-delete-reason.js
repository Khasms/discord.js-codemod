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
					type: 'ObjectExpression',
					properties: [
						{
							type: 'Property',
							key: {
								name: 'reason',
							},
						},
					],
				},
			],
		})
		.replaceWith(({ node }) => {
			const props = node.arguments[0].properties;
			const reason = props.find((prop) => prop.key.name === 'reason');
			props.splice(props.indexOf(reason), 1);

			if (props.length === 0) node.arguments = [];

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
