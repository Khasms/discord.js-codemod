/* eslint-disable @typescript-eslint/restrict-template-expressions */
const { spawnSync } = require('child_process');
const { access } = require('fs/promises');
const { dirname, join, resolve } = require('path');
const yargs = require('yargs');

const jscsDir = dirname(require.resolve('jscodeshift'));
const jscsExec = join(jscsDir, './bin/jscodeshift.js');

async function runTransform(transform, files, flags, codemodFlags) {
	const transformerSrcPath = resolve(__dirname, './src', `${transform}.js`);
	let transformerPath;
	try {
		await access(transformerSrcPath);
		transformerPath = transformerSrcPath;
	} catch (srcPathError) {
		if (srcPathError.code === 'ENOENT') {
			throw new Error(
				`Transform '${transform}' not found. Check out ${resolve(
					__dirname,
					'./README.md',
				)} for a list of available codemods.`,
			);
		}

		throw srcPathError;
	}

	const args = [
		jscsExec,
		'--transform',
		transformerPath,
		...codemodFlags,
		'--extensions',
		'js,ts',
		'--ignore-pattern',
		'**/node_modules/**',
		'--no-babel',
	];
	if (flags.dry) {
		args.push('--dry');
	}
	if (flags.print) {
		args.push('--print');
	}
	if (flags.jscodeshift) {
		args.push(flags.jscodeshift);
	}
	args.push(...files);

	console.log(`Executing command: jscodeshift ${args.join(' ')}`);
	const jscsProcess = spawnSync('node', args, { stdio: 'inherit' });

	if (jscsProcess.error) throw jscsProcess.error;
}

function run(argv) {
	const { codemod, paths, ...flags } = argv;

	return runTransform(
		codemod,
		paths.map((filePath) => resolve(filePath)),
		flags,
		argv._,
	);
}

yargs
	.command({
		command: '$0 <codemod> <paths...>',
		describe: 'Applies a codemod to the specified paths',
		builder: (command) => {
			return command
				.positional('codemod', {
					description: 'The name of the codemod',
					type: 'string',
				})
				.positional('paths', {
					array: true,
					description: 'Paths forwarded to `jscodeshift`',
					type: 'string',
				})
				.option('dry', {
					description: 'Dry run (no changes are made to files)',
					default: false,
					type: 'boolean',
				})
				.option('print', {
					description: 'Print transformed files to stdout, useful for development',
					default: false,
					type: 'boolean',
				})
				.option('jscodeshift', {
					description: '(Advanced) Pass options firectly to jscodeshift',
					default: false,
					type: 'string',
				});
		},
		handler: run,
	})
	.scriptName('npx discord.js-codemod')
	.example('$0 v13.0.0/move-intents src')
	.example('$0 v13.0.0/all src --dry')
	.help()
	.parse();
