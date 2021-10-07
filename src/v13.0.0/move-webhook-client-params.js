const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.NewExpression)
		.filter(({ node }) => {
			return (
				(node.callee.name === 'WebhookClient' || node.callee.property?.name === 'WebhookClient') &&
				node.arguments.length > 0
			);
		})
		.replaceWith(({ node }) => {
			const newNode = [j.objectExpression([])];

			const id = node.arguments[0];
			if (id.name === 'id') {
				newNode[0].properties.push(id);
			} else {
				const idProp = j.property('init', j.identifier('id'), id);
				newNode[0].properties.push(idProp);
			}

			const token = node.arguments[1];
			if (token) {
				if (token.name === 'token') {
					newNode[0].properties.push(token);
				} else {
					const tokenProp = j.property('init', j.identifier('token'), token);
					newNode[0].properties.push(tokenProp);
				}
			}

			const options = node.arguments[2];
			if (options) newNode.push(options);

			node.arguments = newNode;

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
