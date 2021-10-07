const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'respawnAll',
				},
			},
		})
		.filter(({ node }) => node.arguments.length > 0)
		.forEach(({ node }) => {
			const shardDelay = node.arguments[0];
			const newNode = j.objectExpression([j.property('init', j.identifier('shardDelay'), shardDelay)]);

			const respawnDelay = node.arguments[1];
			if (respawnDelay) {
				newNode.properties.push(j.property('init', j.identifier('respawnDelay'), respawnDelay));
			}

			const timeout = node.arguments[2];
			if (timeout) {
				newNode.properties.push(j.property('init', j.identifier('timeout'), timeout));
			}

			node.arguments = [newNode];
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
