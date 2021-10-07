const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.NewExpression, {
			arguments: [
				{
					type: 'ObjectExpression',
					properties: [
						{
							key: {
								name: 'fetchAllMembers',
							},
						},
					],
				},
			],
		})
		.filter(({ node }) => {
			return node.callee.name === 'Client' || node.callee.property?.name === 'Client';
		})
		.replaceWith(({ node }) => {
			const clientProps = node.arguments[0].properties;
			const famObj = clientProps.find((prop) => prop.key.name === 'fetchAllMembers');

			clientProps.splice(clientProps.indexOf(famObj), 1);

			if (clientProps.length === 0) node.arguments = [];

			return node;
		})
		.toSource(printOptions);
};
