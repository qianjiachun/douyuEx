# ESM 模块化迁移计划（详细版）

> 状态日期：2026-04-25
> 
> 目标：将工程从“历史拼接式脚本 + 局部 CommonJS”逐步迁移为“标准 ESM + 可分阶段发布”的结构，降低维护成本并提升可测试性。

## 1. 迁移目标与验收标准

### 1.1 目标
1. 统一 Node 侧脚本为 ESM 语法（`import/export`）。
2. 统一前端源码入口的依赖边界，避免隐式全局注入。
3. 建立“渐进迁移”机制：允许 legacy 产物继续发布，同时新模块化架构可并行演进。
4. 保证构建产物与现有用户脚本使用方式兼容。

### 1.2 验收标准
- `npm run build` 成功（Vite 产物可构建）。
- `node build.js` 成功（legacy 拼接产物可构建）。
- 代码库中 Node 构建脚本不再使用 `require/module.exports`。
- 有书面迁移计划与执行记录，便于后续 PR 按阶段推进。

---

## 2. 现状盘点

### 2.1 已完成项
- 项目已声明 `"type": "module"`，说明 Node 默认采用 ESM 语义。
- `src` 业务代码与 `vite.config.js` 已以 ESM 形式组织。

### 2.2 待解决问题
- `build.js` 仍使用 CommonJS（`require`），在 `type: module` 环境下存在运行风险。
- legacy 拼接链路与 Vite 链路并存，但缺乏统一的迁移文档与里程碑。
- 某些第三方内嵌字符串（如 worker bundle）含 `require` 文本，不属于当前仓库模块系统本体，需要单独评估是否替换上游版本。

---

## 3. 分阶段迁移路线图

## Phase 0（本次已执行）—— 基线统一
- [x] 将 `build.js` 转换为 ESM：
  - `require` -> `import`
  - 使用 `fileURLToPath(import.meta.url)` 获取等价 `__dirname`
  - 路径访问全部改为 `path.resolve`，消除运行目录耦合
- [x] 保留 legacy 产物流程，避免影响既有发布习惯。
- [x] 输出本迁移计划文档。

## Phase 1（本次已执行）—— 入口模块拆分
- [x] 将 `src/main.js` 的“初始化注册”拆分为可测试模块（`src/bootstrap/initLifecycle.js`）。
- [x] 统一 side-effect import 与显式函数调用边界（`runtime.js` 改为依赖注入 + 生命周期装配）。
- [x] 为关键初始化阶段添加最小 smoke test（`scripts/smoke-bootstrap.mjs`）。

## Phase 2（建议下一步）—— 构建链路收敛
- [x] 对比 legacy 拼接产物与 Vite 产物能力差异，明确保留策略（保留 legacy 文件名作为兼容别名）。
- [x] 若功能等价，逐步淘汰 legacy 拼接脚本，统一由 Vite 输出（`build:legacy` 已改为调用 Vite）。
- [ ] 补充构建产物校验（header、metadata、体积阈值）。

## Phase 3（建议下一步）—— 发布与回滚策略
- [ ] 建立 release checklist（版本号、元信息、CDN 依赖、兼容性）。
- [ ] 建立快速回滚机制（保留最近稳定版本 artifact）。

---

## 4. 风险与应对

1. **运行时兼容风险**：用户脚本运行环境对 bundle 形态较敏感。  
   - 应对：采用“双链路并行 + 对比验证”而非一次性切换。

2. **历史模块全局变量耦合**：部分功能依赖全局符号注入顺序。  
   - 应对：先做“模块边界显式化”，再做“入口拆分”。

3. **第三方内嵌代码不可控**：字符串形式的 worker bundle 含 CJS 语义。  
   - 应对：标记为“外部依赖迁移项”，在 Phase 2 单独评估替换。

---

## 5. 本次执行记录

- 已将 `build.js` 完成 ESM 化改造并验证可执行。
- 已补充本迁移文档，形成后续分阶段推进依据。
- 已完成 Phase 1 的初始化生命周期拆分，形成 `bootstrap` 目录下的可测试装配模块。
- 已新增 `npm run test:smoke`，用于验证初始化链路与样式注入不会回归。
- 已执行验收命令：
  - `npm run build:legacy` ✅
  - `npm run test:smoke` ✅
  - `npm run build` ✅

## 6. 收尾项（本次补充）

- 已执行 `npm install`，确认 `vite` / `vite-plugin-monkey` 依赖存在。
- 修复 `vite.config.js` 中 `vite-plugin-monkey` 导入方式，兼容当前已安装版本导出（`default`）。
- 调整 Vite userscript 打包参数（`inlineDynamicImports`、`cssCodeSplit: false`）并修复 `antifeature` 元信息格式，确保 `vite build` 可稳定产出单文件脚本。
- 复验三条验收命令均通过，ESM 迁移基线目标闭环。

## 7. Phase 2 进展（本次新增）

- `build.js` 已由 legacy 拼接实现切换为 Vite 构建代理：内部直接调用 `vite build`。
- `build:legacy` 仍保留命令入口，但仅用于生成兼容别名产物（`douyuex.js` / `douyuex.user.js`），底层不再走旧拼接逻辑。
- 构建链路已收敛为单一路径（Vite），后续可在不破坏历史发布流程的前提下继续下线 legacy 命令别名。
