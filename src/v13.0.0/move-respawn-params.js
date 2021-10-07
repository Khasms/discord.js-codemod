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
					name: 'respawn',
				},
			},
		})
		.filter(({ node }) => {
			return node.arguments.length > 0;
		})
		.replaceWith(({ node }) => {
			const delay = node.arguments[0];

			const newNode = j.objectExpression([j.property('init', j.identifier('delay'), delay)]);

			const timeout = node.arguments[1];
			if (timeout) {
				const timeoutProp = j.property('init', j.identifier('timeout'), timeout);

				newNode[0].properties.push(timeoutProp);
			}

			node.arguments = [newNode];

			return node;
		})
		.toSource(printOptions);
};
