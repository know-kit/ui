import { definePrompt } from 'czg';
const TYPES = {
  CI: 'ci',
  REVERT: 'revert',
  CHORE: 'chore',
  BUILD: 'build',
  MR: 'mr',
  FEAT: 'feat',
  FIX: 'fix',
  DOCS: 'docs',
  STYLE: 'style',
  REFACTOR: 'refactor',
  PERF: 'perf',
  TEST: 'test',
};
export default definePrompt({
  // ==================== 交互提示文本配置 ====================
  // messages: 自定义每个交互步骤显示的提示文本
  // 使用场景：团队使用中文或其他语言，需要本地化提示文本
  // 注意：注释掉某个字段会使用插件的默认英文文本
  messages: {
    type: '选择你要提交的类型 :',
    scope: '选择提交范围 :',
    subject: '填写简短精炼的变更描述 :\n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
    // 注释了还需要忽略
    // breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
    // 这里注释后，插件会使用默认的文本，所以只能使用忽略
    // footerPrefixesSelect: '选择关联issue前缀（可选）:',
    // 当选择自定义时，会出现此输入框
    breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
    customFooterPrefix: '输入自定义issue前缀 :',
    footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
    confirmCommit: '是否提交或修改commit ?',
  },
  // ==================== 提交类型配置 ====================
  // types: 定义可选的提交类型列表
  // 使用场景：展示给用户选择的提交类型，必须与 rules['type-enum'] 保持一致
  // 字段说明：
  //   value: 写入 commit message 的实际值
  //   name: 在命令行选择界面显示的描述（支持 emoji 和双语）
  //   emoji: 写入 commit 的 emoji（文本格式，如 :sparkles:，兼容性好）
  // 注意：name 中的 emoji 是 Unicode 形式（仅用于显示），emoji 字段是文本形式（用于写入）
  types: [
    {
      value: TYPES.FEAT,
      name: 'feat:    ✨  新增功能 | A new feature',
      emoji: ':sparkles:',
    },
    {
      value: TYPES.FIX,
      name: 'fix:     🐛 修复缺陷 | A bug fix',
      emoji: ':bug:',
    },
    {
      value: TYPES.DOCS,
      name: 'docs:     📝 文档更新 | Documentation only changes',
      emoji: ':memo:',
    },
    {
      value: TYPES.STYLE,
      name: 'style:    💄 代码格式 | Changes that do not affect the meaning of the code',
      emoji: ':lipstick:',
    },
    {
      value: TYPES.REFACTOR,
      name: 'refactor: ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature',
      emoji: ':recycle:',
    },
    {
      value: TYPES.PERF,
      name: 'perf:     ⚡️ 性能提升 | A code change that improves performance',
      emoji: ':zap:',
    },
    {
      value: TYPES.TEST,
      name: 'test:     ✅ 测试相关 | Adding missing tests or correcting existing tests',
      emoji: ':white_check_mark:',
    },
    {
      value: TYPES.BUILD,
      name: 'build:    📦️  构建相关(如升级 npm 包、修改 webpack 配置等) | Changes that affect the build system or external dependencies',
      emoji: ':package:',
    },
    {
      value: TYPES.CI,
      name: 'ci:       🎡 持续集成(如修改 CI 配置、脚本等) | Changes to our CI configuration files and scripts',
      emoji: ':ferris_wheel:',
    },
    {
      value: TYPES.REVERT,
      name: 'revert:   ⏪️ 回退代码 | Revert to a commit',
      emoji: ':rewind:',
    },
    {
      value: TYPES.CHORE,
      name: 'chore:    🔨 其他修改 | Other changes that do not modify src or test files',
      emoji: ':hammer:',
    },
  ],

  // ==================== Emoji 相关配置 ====================
  // useEmoji: 是否在 commit message 中写入 emoji
  // 使用场景：
  //   false: emoji 仅在交互界面显示，commit 中不包含（如：feat: add feature）
  //   true: emoji 写入 commit（如：:sparkles: feat: add feature 或 feat: :sparkles: add feature）
  // 建议：
  //   - 使用 GitHub/GitLab：建议 true，会自动渲染为图标
  //   - 使用老旧 Git 工具或终端：建议 false，避免显示异常
  //   - 使用文本形式 emoji（:sparkles:）比 Unicode（✨）兼容性更好
  useEmoji: false,

  // emojiAlign: emoji 在 commit message 中的位置（需要 useEmoji: true）
  // 使用场景：
  //   'start': emoji 在开头，格式：:sparkles: feat: add feature
  //   'center': emoji 在中间，格式：feat: :sparkles: add feature
  // 建议：'start' 更符合 gitmoji 规范
  emojiAlign: 'start',

  // ==================== AI 相关配置 ====================
  // useAI: 是否启用 OpenAI 生成 commit message
  // 使用场景：需要 AI 根据 git diff 自动生成提交信息
  // 前置条件：需要配置 OPENAI_API_KEY 环境变量
  // useAI: false,

  // aiNumber: AI 生成的 commit message 数量
  // 使用场景：生成多个选项供用户选择
  // aiNumber: 1,

  // ==================== 主题配置 ====================
  // themeColorCode: 设置终端交互部件的主题色（ANSI 颜色代码）
  // 使用场景：统一团队终端界面风格
  // 示例：'38;5;043' 表示绿色
  // themeColorCode: '',
  // ==================== Scope 相关配置 ====================
  // scopes: 定义默认的 scope 列表（对于需要 scope 的类型）
  scopes: [],

  // ==================== 禁用自定义 scope ====================
  // allowCustomScopes: 是否允许自定义 scope
  // 设为 false，完全禁用自定义 scope 输入，不显示 custom 选项
  allowCustomScopes: false,

  // 是否在选择 模块范围 显示为空选项
  allowEmptyScopes: false,

  // ==================== 自定义选项控制 ====================
  // customScopesAlign: 自定义 scope 选项的位置（不生效，因为 allowCustomScopes: false）
  // customScopesAlign: 'top',

  // customScopesAlias: 自定义 scope 选项显示的文本（不生效，因为 allowCustomScopes: false）
  // 注释掉以确保不显示
  // customScopesAlias: 'custom',

  // 自定义的
  // emptyScopesAlias: '(无需 scope，直接回车跳过)',

  // ==================== Subject 相关配置 ====================
  // upperCaseSubject: subject 首字母大小写控制
  // 使用场景：
  //   true: 强制首字母大写，如 "Add new feature"
  //   false: 强制首字母小写，如 "add new feature"
  //   null: 不限制（推荐）
  // 建议：设为 null，让团队自由选择风格
  upperCaseSubject: null,

  // ==================== Breaking Changes 相关配置 ====================
  // markBreakingChangeMode: 破坏性变更的标记模式
  // 使用场景：
  //   false: 需要详细描述破坏性变更的内容（推荐）
  //   true: 只需确认是否有破坏性变更（yes/no），适合快速提交
  // 示例：false 时会提示 "详细描述破坏性变更"，true 时只问 "是否包含破坏性变更？"
  // markBreakingChangeMode: false,

  // allowBreakingChanges: 哪些 type 允许添加破坏性变更描述
  // 使用场景：
  //   通常只有 feat 和 fix 可能包含破坏性变更
  //   其他类型（如 docs、style）一般不会有破坏性变更
  // 示例：只有选择 feat 或 fix 时，才会提示输入 breaking changes
  // allowBreakingChanges: ['feat', 'fix'],

  // ==================== 换行相关配置 ====================
  // breaklineNumber: 每行字符数限制
  // 使用场景：限制 subject 和 body 的每行长度，保持 commit 信息整洁
  // 建议：50-100 之间，GitHub 推荐 72
  breaklineNumber: 100,

  // breaklineChar: 在 body 和 breaking 中用于表示换行的字符
  // 使用场景：在单行输入中表示多行内容
  // 示例：输入 "第一行|第二行|第三行" 会被转换为三行
  breaklineChar: '|',
  // ==================== 交互流程控制 ====================
  // skipQuestions: 跳过的交互步骤，简化提交流程
  // 使用场景：跳过不常用的步骤，提高提交效率
  // 可选值：
  //   'scope': 跳过 scope 选择
  //   'customScope': 跳过自定义 scope 输入
  //   'body': 跳过 body 详细描述
  //   'breaking': 跳过 breaking changes 描述
  //   'footerPrefix': 跳过 issue 前缀选择
  //   'footer': 跳过 issue 号输入
  //   'confirmCommit': 跳过最终确认步骤
  // 建议：根据团队实际使用情况配置
  // 注意：不要跳过 'scope'，因为某些 type 需要 scope，某些不需要（通过 scopeOverrides 控制）
  skipQuestions: [
    'scope',
    // 'confirmCommit', // 保留确认步骤，便于检查提交信息
    // 'breaking', // 跳过破坏性变更描述（不常用）
    'footerPrefix', // 跳过 issue 前缀选择
  ],
  // ==================== Issue 关联配置 ====================
  // issuePrefixes: 预定义的 issue 关联前缀
  // 使用场景：
  //   GitHub: 使用 closes、fixes、resolves 自动关闭 issue
  //   GitLab: 使用 Closes、Fixes 关联 issue
  //   Gitee: 使用 link（进行中）、closed（已完成）
  // 示例：选择 closes 并输入 #123，生成 "closes #123"
  // issuePrefixes: [
  //   // GitHub/GitLab 示例
  //   { value: 'closes', name: 'closes:   关闭 issue' },
  //   { value: 'fixes', name: 'fixes:    修复 issue' },
  //   // Gitee 示例
  //   { value: 'link', name: 'link:     链接 ISSUES 进行中' },
  //   { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
  // ],

  // customIssuePrefixAlign: 自定义 issue 前缀选项的位置
  // 'top': 在列表顶部  'bottom': 在列表底部
  // customIssuePrefixAlign: 'top',

  // 自定义 选择 issue 前缀 中 跳过选项skip 在命令行中显示的 名称
  // emptyIssuePrefixAlias: 'skip',

  // 自定义 选择 issue 前缀 中 自定义选项custom 在命令行中显示的 名称
  // customIssuePrefixAlias: 'custom',

  // allowCustomIssuePrefix: 是否允许自定义 issue 前缀
  // allowCustomIssuePrefix: true,

  // allowEmptyIssuePrefix: 是否允许不关联 issue
  // allowEmptyIssuePrefix: true,

  // ==================== 其他配置 ====================
  // confirmColorize: 最终确认界面是否使用彩色显示
  // 使用场景：让 commit 预览更清晰易读
  confirmColorize: true,

  // scopeOverrides: 为不同的 type 配置不同的 scope 列表
  // 使用场景：
  //   1. 为需要 scope 的类型配置具体的 scope 列表
  //   2. 为不需要 scope 的类型配置只包含"跳过"选项的特殊列表
  // 实现效果：
  //   - feat/fix 等类型：显示完整的 scope 列表，必须选择
  //   - ci/chore 等类型：直接跳过,为一个选项 + allowCustomScopes + allowEmptyScopes，可以做到
  scopeOverrides: {
    // 为不需要 scope 的类型配置空列表，直接跳过 scope 选择。所以必须最少一个选择
    // "ci": [''],
  },
  // ==================== 默认值配置 ====================
  // 配置默认值，减少重复输入，提高提交效率
  // 使用场景：团队有统一的提交习惯时
  // defaultBody: '详见相关 issue',
  defaultBody: '',

  // defaultScope: 默认 scope
  // 设为空字符串，对于允许空 scope 的类型（ci, chore 等），默认就是跳过
  // 用户只需按回车即可跳过 scope 选择
  defaultScope: '',

  // defaultSubject: '',
  defaultSubject: '',
});
