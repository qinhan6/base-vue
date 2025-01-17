module.exports = {
	ignores: [(commit) => commit.includes('init')],
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 信息以空格开头
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [2, 'always'],
		// 信息最大长度
		'header-max-length': [2, 'always', 108],
		// 信息不能未空
		'subject-empty': [2, 'never'],
		// 信息类型不能未空
		'type-empty': [2, 'never'],
		// 提交信息的类型 下文有介绍
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'perf',
				'style',
				'docs',
				'test',
				'refactor',
				'build',
				'ci',
				'chore',
				'revert',
				'wip',
				'workflow',
				'types',
				'release',
				'temp'
			]
		]
	}
};

// 中英文对照版
// types: [
//   { value: 'feat', name: 'feat:     新增功能' },
//   { value: 'fix', name: 'fix:      修复缺陷' },
//   { value: 'docs', name: 'docs:     文档变更' },
//   { value: 'style', name: 'style:    代码格式' },
//   { value: 'refactor', name: 'refactor: 代码重构' },
//   { value: 'perf', name: 'perf:     性能优化' },
//   { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
//   { value: 'build', name: 'build:    构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)' },
//   { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
//   { value: 'revert', name: 'revert:   回滚 commit' },
//   { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)' },
//   { value: 'wip', name: 'wip:      正在开发中' },
//   { value: 'workflow', name: 'workflow: 工作流程改进' },
//   { value: 'types', name: 'types:    类型定义文件修改' },
// ],
