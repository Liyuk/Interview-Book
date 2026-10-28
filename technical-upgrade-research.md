# VuePress 0.x 知识书技术升级调研

## 结论

**推荐 VitePress 1.x（稳定线）作为基础升级目标。** 本仓库当前是 VuePress `^0.8.4`，内容约 31 篇 Markdown、48 个文件，页面和图片都在 `docs/` 下；现有部署脚本将构建产物推到 `gh-pages`。VitePress 可继续以 `docs/` 为站点根目录，保留大部分目录结构和 Markdown，迁移范围相对清楚，同时提供默认技术文档主题、本地全文搜索与 GitHub Pages 子路径配置（参见 [项目结构与路由](https://vitepress.dev/guide/getting-started)、[本地搜索](https://vitepress.dev/reference/default-theme-search)、[部署](https://vitepress.dev/guide/deploy)）。

版本状态需要留意：VitePress 官方站点当前展示稳定版 **1.6.4**，并明确把 2.0 标为 alpha；新建或迁移时应锁定稳定版，不要照当前默认安装命令装 `@next`。VuePress 当前主线 v2 官方文档仍标注 RC。若本项目强调留在 VuePress 生态，v2 是可行次选，但不是“直接升级”：要迁移配置和主题，并接受 RC 阶段的配置/API 变化。Astro Starlight 的文档体验很完整，但要重排内容目录、补齐每页标题并调整内部链接/图片和部署方式，对这批既有文件而言迁移面最大。

## 方案比较

| 方案 | 内容与路由 | 导航、主题、搜索 | Node 与 GitHub Pages | 对本仓库的迁移量 |
|---|---|---|---|---|
| **VitePress 1.x（建议）** | 可直接以 `docs/` 为项目根，Markdown 按原目录生成路由；`README.md` 作为目录页需确认入口映射（[路由](https://vitepress.dev/guide/routing)）。公共 `base` 自动应用到 Markdown 内链与资源，少量原始 HTML 绝对路径仍需检查（[资源处理](https://vitepress.dev/guide/asset-handling)）。 | 默认文档主题支持配置导航/侧栏；内置本地全文搜索，也可配置 DocSearch（[默认主题配置](https://vitepress.dev/reference/default-theme-config)、[搜索](https://vitepress.dev/reference/default-theme-search)）。 | 当前 Getting Started 要求 Node 22+；部署文档支持 GitHub Pages 的 `/仓库名/` base，产物默认 `docs/.vitepress/dist`（[安装](https://vitepress.dev/guide/getting-started)、[部署](https://vitepress.dev/guide/deploy)）。 | **低至中**：新增 `.vitepress/config`、更新依赖/scripts/base 与发布目录；逐页检查旧式 Markdown/图片/链接。无需为生成器强制移动 31 篇文章。 |
| **VuePress v2** | 保持 VuePress 的 `docs/` 内容模型，目录路由和资产处理思路相近；需处理 0.x 到现代版本间的差异。 | 默认主题和官方插件可用，但 0.x 配置不可照搬；v2 不再把默认主题/插件内置在核心包中。 | 官方文档要求 Node 20.9+；支持 GitHub Pages base 和 Actions 发布。 | **中**：跨越 0.x 与 v2，需重写配置；官方迁移说明 v1 的主题/插件不兼容 v2、配置改为 ESM，v2 主题配置有破坏性变化（[迁移指南](https://v2.vuepress.vuejs.org/guide/migration.html)）。当前仓库未见已提交 `.vuepress` 配置，降低一部分工作量。 |
| **Astro Starlight** | 内容默认放在 `src/content/docs/`，文件名/目录形成路由；Markdown 支持广，但每页需有 `title` frontmatter。相对图片支持；内容搬入新目录时要核查原图片相对路径和站内链接（[结构](https://starlight.astro.build/guides/project-structure/)、[内容](https://starlight.astro.build/guides/authoring-content/)）。 | 内置文档主题；侧栏可按文件系统自动生成，也可手工分组；默认集成 Pagefind 全文搜索（[侧栏](https://starlight.astro.build/guides/sidebar/)、[搜索](https://starlight.astro.build/guides/site-search/)）。 | 当前 Astro 文档要求 Node 22.23.4+；官方 GitHub Pages Action 需配置 `site`、仓库级 `base` 和 Pages 权限（[安装](https://docs.astro.build/en/install-and-setup/)、[GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)）。 | **中至高**：新建 Astro 项目结构，搬动/映射现有 Markdown 与资源，为无标题页补 frontmatter；重审站内链接和 base 前缀。适合愿意接受 Astro 内容模型并利用其完整文档主题的情况。 |

## 路由、现有链接与部署注意点

- 线上地址是 `https://mountain-buzhou.github.io/Interview-Book/`，属于项目站点，VitePress 的 `base` 应设为 `/Interview-Book/`。GitHub Pages 上已有路径和 HTML 的兼容性应在预览中确认；不要只检查首页。
- VitePress 默认把 `guide/a.md` 输出为 `/guide/a.html`，`guide/README.md` 路由需要按目录首页惯例验证。当前内容入口包括 `docs/README.md`、`docs/guide/README.md`，且 `docs/README.md` 有目录链接；保留已有 URL 比单纯让构建通过更重要。
- 当前 README/正文里有 Markdown 链接与图片引用；VitePress 的 Markdown 内链会加 `base`，但手写 HTML `<a href>` 不会自动加。迁移时应搜索站内绝对路径、带 `.md`/`.html` 的链接以及相对图片引用，逐个确认构建结果。
- 当前 `deploy.sh` 假设产物位于仓库根目录 `dist/`，而 VitePress 默认输出到 `docs/.vitepress/dist`。需更新构建命令/产物路径，或在发布流程中明确拷贝到 `dist/`；还需为项目子路径设置 base。Starlight 则更适合改为官方 Actions 工作流。
- 这是基础设施建议，不要求新增或改写知识内容。建议第一阶段仅完成生成器、主题配置、导航/search、base、发布路径迁移；内容校对可单列。

## 官方资料

- [VitePress 版本与项目定位](https://vitepress.dev/guide/what-is-vitepress) · [Getting Started（Node、安装、项目布局）](https://vitepress.dev/guide/getting-started) · [路由](https://vitepress.dev/guide/routing) · [资源与 base](https://vitepress.dev/guide/asset-handling) · [默认主题搜索](https://vitepress.dev/reference/default-theme-search) · [GitHub Pages/部署](https://vitepress.dev/guide/deploy)
- [VuePress v2 Getting Started（RC 状态、Node 要求）](https://v2.vuepress.vuejs.org/guide/getting-started.html) · [从旧版迁移](https://v2.vuepress.vuejs.org/guide/migration.html) · [部署](https://v2.vuepress.vuejs.org/guide/deployment.html)
- [Astro 安装（Node 要求）](https://docs.astro.build/en/install-and-setup/) · [Starlight 项目结构](https://starlight.astro.build/guides/project-structure/) · [内容与 Markdown](https://starlight.astro.build/guides/authoring-content/) · [侧栏](https://starlight.astro.build/guides/sidebar/) · [搜索](https://starlight.astro.build/guides/site-search/) · [GitHub Pages 部署](https://docs.astro.build/en/guides/deploy/github/)

*版本状态和 Node 要求按 2026-10-28 查阅到的官方文档记录；发布前应再次核对目标版本文档。*
