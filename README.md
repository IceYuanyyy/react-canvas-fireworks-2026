<p align="center">
  <img src="https://img.shields.io/badge/React-18.2+-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.0+-purple.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4+-sky.svg" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

<p align="center">
  <b>Happy New Year 2026 - 炫酷跨年烟花倒计时网站</b>
</p>

<p align="center">
  🔗 <b>在线演示: <a href="http://47.104.232.164:2026/" target="_blank">http://47.104.232.164:2026/</a></b>
</p>

---

## ✨ 功能特点

- 🎆 **极致视觉体验** - 基于 HTML5 Canvas 的高性能粒子烟花
  - 逼真的重力与物理效果
  - 绚丽的色彩与光影渲染
  - "2026" 文字粒子爆炸特效

- 📱 **完美移动端适配** - 专为手机访问优化
  - **动态视口 (Dynamic Viewport)**：自动检测移动设备并调整视口宽度至 768px，实现"广角"视野
  - 响应式字体与布局：大屏震撼，小屏精致
  - 触摸交互优化

- 🎨 **现代 UI 设计** - Glassmorphism 玻璃拟态风格
  - 磨砂玻璃质感卡片
  - 丝滑的进入/退出动画
  - 鎏金字体与高级配色

- 👤 **个性化作者展示** - 互动式作者信息卡片
  - 包含头像、个人简介 (From SDTBU Student)
  - 集成 GitHub、Gmail、QQ 邮箱等社交链接

---

## 📁 项目结构

```
HappyNewYear2026/
├── README.md                 # 项目说明文档
├── index.html                # 入口 HTML (含移动端视口适配脚本)
├── package.json              # 项目依赖配置
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 打包配置 (端口 2026)
├── public/                   # 静态资源
├── src/                      # 源代码目录
│   ├── App.tsx               # 主应用组件 (流程控制)
│   ├── main.tsx              # React 入口
│   ├── index.css             # 全局样式 (Tailwind 指令)
│   ├── types.ts              # TS 类型定义
│   └── components/           # 组件目录
│       ├── AuthorCard.tsx    # 作者信息卡片组件
│       └── FireworksCanvas.tsx # 核心烟花渲染画布
└── dist/                     # 打包输出目录 (用于部署)
    ├── index.html
    └── assets/
```

## 🚀 快速开始

### 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认端口 2026)
npm run dev
```

### 打包部署 (宝塔面板)

1. **构建项目**：
   ```bash
   npm run build
   ```
   这将在根目录下生成 `dist` 文件夹。

2. **上传服务器**：
   - 将 `dist` 文件夹内的所有文件（`index.html` 和 `assets` 文件夹）上传至网站根目录。
   - 确保 Nginx/Apache 配置指向该目录。

3. **访问网站**：
   打开浏览器访问 `http://<你的服务器IP>:2026` 即可。
