const {
	ActivityFlags,
	ApplicationFlags,
	IntentsFlags,
	MessageFlags,
	PermissionFlags,
	SystemChannelFlags,
	UserFlags,
} = require('../constants');
const addImports = require('jscodeshift-add-imports');
const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	const flags = [
		['Permissions', PermissionFlags],
		['ActivityFlags', ActivityFlags],
		['ApplicationFlags', ApplicationFlags],
		['MessageFlags', MessageFlags],
		['SystemChannelFlags', SystemChannelFlags],
		['UserFlags', UserFlags],
		['Intents', IntentsFlags],
	];

	// Change to flags
	const found = [];
	root
		.find(j.Literal)
		.filter(({ node }) =>
			[
				...PermissionFlags,
				...ActivityFlags,
				...ApplicationFlags,
				...MessageFlags,
				...SystemChannelFlags,
				...UserFlags,
				...IntentsFlags,
			].includes(node.value),
		)
		.replaceWith(({ node }) => {
			const bitfieldName = flags.find(([, value]) => value.includes(node.value))[0];
			found.push(bitfieldName);

			return j.memberExpression(
				j.memberExpression(j.identifier(bitfieldName), j.identifier('FLAGS')),
				j.identifier(node.value),
			);
		});

	if (found.includes('Permissions')) {
		addImports(root, [j.template.statement`import { Permissions } from 'discord.js';`]);
	}

	if (found.includes('ActivityFlags')) {
		addImports(root, [j.template.statement`import { ActivityFlags } from 'discord.js';`]);
	}

	if (found.includes('ApplicationFlags')) {
		addImports(root, [j.template.statement`import { ApplicationFlags } from 'discord.js';`]);
	}

	if (found.includes('MessageFlags')) {
		addImports(root, [j.template.statement`import { MessageFlags } from 'discord.js';`]);
	}

	if (found.includes('SystemChannelFlags')) {
		addImports(root, [j.template.statement`import { SystemChannelFlags } from 'discord.js';`]);
	}

	if (found.includes('UserFlags')) {
		addImports(root, [j.template.statement`import { UserFlags } from 'discord.js';`]);
	}

	if (found.includes('Intents')) {
		addImports(root, [j.template.statement`import { Intents } from 'discord.js';`]);
	}

	return root.toSource(printOptions);
};

module.exports.parser = parser;
