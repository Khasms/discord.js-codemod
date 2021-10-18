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
						name: 'disableMentions',
					},
				},
			],
		})
		.forEach(({ node }) => {
			const props = node.properties;
			const disableMentions = props.find((prop) => prop.key.name === 'disableMentions');
			const parse = j.property(
				'init',
				j.identifier('parse'),
				j.arrayExpression([j.literal('roles'), j.literal('users'), j.literal('everyone')]),
			);
			const repliedUser = j.property('init', j.identifier('repliedUser'), j.literal(true));

			switch (disableMentions.value.value) {
				case 'all':
					parse.value.elements = [];
					repliedUser.value.value = false;
					break;
				case 'everyone':
					parse.value.elements = [j.literal('roles'), j.literal('users')];
					break;
			}

			const allowedMentions = j.property(
				'init',
				j.identifier('allowedMentions'),
				j.objectExpression([parse, repliedUser]),
			);

			props.splice(props.indexOf(disableMentions), 1);
			props.push(allowedMentions);
		});

	return root.toSource(printOptions);
};

module.exports.parser = parser;
