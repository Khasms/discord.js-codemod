const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression)
		.filter(({ node }) => {
			return (
				['createReactionCollector', 'createMessageCollector', 'awaitReactions', 'awaitMessages'].includes(
					node.callee.property?.name,
				) &&
				node.arguments.length > 0 &&
				node.arguments[0].type !== 'ObjectExpression'
			);
		})
		.replaceWith(({ node }) => {
			const filterParam = node.arguments[0];

			const newFilterParam =
				filterParam.name === 'filter'
					? node.arguments[0]
					: j.property(
							'init',
							j.identifier('filter'),
							filterParam.expression || filterParam.type === 'CallExpression'
								? filterParam
								: { type: filterParam.type, name: filterParam.name },
					  );

			const object = node.arguments[1] ?? j.objectExpression([]);
			object.properties.push(newFilterParam);
			node.arguments = [object];

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
