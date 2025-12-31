
# 2026 跨年庆典应用

这是一个专为 2026 跨年设计的倒计时应用。

## ⚠️ 解决 `Unexpected token '<'` 错误

如果你直接在浏览器打开 `index.html` 或直接上传到 GitHub Pages 发现报错，是因为浏览器无法直接运行 `.tsx` (JSX) 代码。

### 正确的 GitHub 部署方式（推荐）

1. **不要**直接使用 `index.html` 托管。
2. 使用 **GitHub Actions**：
   - 将代码推送到 GitHub 仓库。
   - GitHub 会识别这是一个 React 项目。
   - 在仓库的 `Settings` -> `Pages` 中，将 `Build and deployment` 的 `Source` 改为 `GitHub Actions`。
   - 这样 GitHub 会自动帮你把 `.tsx` 编译成浏览器认识的 `.js`，错误就会消失。

### 本地运行

建议使用简单的静态服务器（如 Vite）运行：
```bash
npx vite
```

## 项目特点
- **中国风视觉**：红绸舞台、金色卷轴、马到成功主题。
- **实时特效**：全屏烟花渲染、动态祝福语弹出。
- **翻页时钟**：复古风格的倒计时展示。
