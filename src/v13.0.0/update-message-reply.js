const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	root
		.find(j.ObjectExpression, {
			properties: [
				{
					type: 'Property',
					key: {
						type: 'Identifier',
						name: 'reply',
					},
				},
			],
		})
		.filter(({ node }) => {
			return node.properties.find((prop) => prop.key.name === 'reply').value.type !== 'ObjectExpression';
		})
		.forEach(({ node }) => {
			const prop = node.properties.find((prop) => prop.key.name === 'reply');
			prop.value = j.objectExpression([j.property('init', j.identifier('messageReference'), prop.value)]);
		});

	return root.toSource(printOptions);
};

module.exports.parser = parser;
