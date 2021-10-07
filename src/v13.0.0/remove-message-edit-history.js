const { parser } = require('../util');

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
								name: 'messageEditHistoryMaxSize',
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
			const editHistoryObj = clientProps.find((prop) => prop.key.name === 'messageEditHistoryMaxSize');

			clientProps.splice(clientProps.indexOf(editHistoryObj), 1);

			if (clientProps.length === 0) node.arguments = [];

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
