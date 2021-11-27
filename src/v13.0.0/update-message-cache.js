/* eslint-disable @typescript-eslint/no-unsafe-argument */

const addImports = require('jscodeshift-add-imports');
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
						name: 'messageCacheMaxSize',
					},
				},
			],
		})
		.forEach(({ node }) => {
			const props = node.properties;
			const maxSize = props.find((prop) => prop.key.name === 'messageCacheMaxSize');
			const makeCache = j.property(
				'init',
				j.identifier('makeCache'),
				j.callExpression(j.memberExpression(j.identifier('Options'), j.identifier('cacheWithLimits')), [
					j.objectExpression([j.property('init', j.identifier('MessageManager'), maxSize.value)]),
				]),
			);

			props.splice(props.indexOf(maxSize), 1);
			props.push(makeCache);

			addImports(
				root,
				j.importDeclaration(
					[j.importSpecifier(j.identifier('Options'), j.identifier('Options'))],
					j.literal('discord.js'),
				),
			);
		});

	return root.toSource(printOptions);
};

module.exports.parser = parser;
