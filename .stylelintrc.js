module.exports = {
	extends: [
		'@cmcm/stylelint-config/preset/essential',
		'@cmcm/stylelint-config/preset/recommended',
		'@cmcm/stylelint-config/preset/stylistic',
	],
	ignoreFiles: [
		'./src/assets/css/vendor/**/*.*',
		'./dist/**/*.*',
	],
}
