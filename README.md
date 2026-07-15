# siyu.website 个人作品集

这是司予的个人作品集网站工程，基于 `React + Vite + TypeScript` 构建，当前线上域名为 [https://www.siyu.website](https://www.siyu.website)。

## 项目结构

- 核心内容数据：`src/data.ts`
- 关于我模块：`src/components/AboutSection.tsx`
- 首页模块：`src/components/HomeSection.tsx`
- 导航模块：`src/components/Navbar.tsx`
- 路由回退配置：`vercel.json`

## 本地运行

前置要求：

- Node.js 18+

启动步骤：

1. 安装依赖

```bash
npm install
```

2. 启动开发环境

```bash
npm run dev
```

3. 打开本地地址

```text
http://localhost:3000/
```

如果 PowerShell 阻止脚本执行，请改用：

```bash
npm.cmd run dev
```

## 构建检查

```bash
npm.cmd run build
```

## 环境变量

本项目默认不依赖 Gemini。

如果需要启用 `/food-picker` 页面，请在 `.env.local` 中配置：

- `VITE_AMAP_KEY`
- `VITE_BAIDU_AK`

参考模板见 `.env.example`。

## 发布到 Vercel

当前目录已绑定 Vercel 项目：

- `projectName`: `trae_e9qwj0bo`
- 线上域名：`https://www.siyu.website`

手动发布命令：

```bash
npx.cmd vercel deploy --prod --yes
```

## 换电脑继续编辑

要实现“换一台电脑打开 Trae 后还能继续改并发布”，建议使用 `GitHub + Vercel`：

1. 把当前工程完整上传到 GitHub 仓库
2. 在另一台电脑中把仓库拉到 Trae 工作区
3. 执行 `npm install`
4. 如需本地调试，补上 `.env.local`
5. 在 Vercel 中继续绑定同一个 GitHub 仓库
6. 之后改代码并推送，即可自动发布到原域名

建议上传的内容：

- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `vercel.json`
- `.env.example`
- `.trae/documents/` 中的项目文档

不会上传的本地缓存：

- `.env.local`
- `.vercel/`
- `.vercel-runtime/`
- `.xdg/`
- `.dbg/`
- `dist/`

## 常用修改位置

- 改经历和项目文案：`src/data.ts`
- 改页面布局和样式：`src/components/*.tsx`
- 改全局样式：`src/index.css`
