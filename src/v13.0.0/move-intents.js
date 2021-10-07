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
								name: 'ws',
							},
							value: {
								properties: [
									{
										key: {
											name: 'intents',
										},
									},
								],
							},
						},
					],
				},
			],
		})
		.replaceWith(({ node }) => {
			const clientProps = node.arguments[0].properties;
			const ws = clientProps.find((prop) => prop.key.name === 'ws');
			const wsProps = ws.value.properties;
			const intents = wsProps.find((prop) => prop.key.name === 'intents');

			node.arguments[0].properties.push(intents);
			wsProps.splice(wsProps.indexOf(intents), 1);

			if (wsProps.length === 0) clientProps.splice(clientProps.indexOf(ws), 1);

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
