const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'spawn',
				},
			},
		})
		.filter(({ node }) => node.arguments.length > 0)
		.forEach(({ node }) => {
			const newNode = j.objectExpression([j.property('init', j.identifier('amount'), node.arguments[0])]);

			const delay = node.arguments[1];
			if (delay) newNode.properties.push(j.property('init', j.identifier('delay'), delay));

			const timeout = node.arguments[2];
			if (timeout) newNode.properties.push(j.property('init', j.identifier('timeout'), timeout));

			node.arguments = [newNode];
		})
		.toSource(printOptions);
};
