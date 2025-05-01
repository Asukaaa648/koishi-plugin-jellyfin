# koishi-plugin-jellyfin

连接 [Jellyfin](https://jellyfin.org/)，支持用户注册、媒体库内搜索等功能的 Koishi 插件。

![npm](https://img.shields.io/npm/v/koishi-plugin-jellyfin)
![license](https://img.shields.io/github/license/Asukaaa648/koishi-plugin-jellyfin)

## ✨ 功能特性

- ✅ Jellyfin 用户注册
- ✅ Jellyfin 媒体库搜索
- ✅ 通过 Koishi 指令一键操作

## 🛠️ 配置

安装插件后，在 Koishi 控制台的 **“插件” → “jellyfin”** 页面中填写以下信息：

| 配置项                | 说明                | 默认值                     |
| --------------------- | ------------------- | -------------------------- |
| `JELLYFIN_SERVER_URL` | Jellyfin 服务器地址 | `http://192.168.1.18:8096` |
| `API_KEY`             | Jellyfin API 密钥   | （必填）                   |
| `USER_ID`             | 默认用户 ID         | （必填）                   |

⚠️ 请确保 `API_KEY` 和 `USER_ID` 已在 Jellyfin 管理员界面中获取。

## 💬 指令

| 指令                                  | 说明                   | 示例                           |
| ------------------------------------- | ---------------------- | ------------------------------ |
| `搜索 <内容>`                         | 在 Jellyfin 中搜索内容 | `搜索 星球大战`                |
| `创建账号 <用户名> <密码> <确认密码>` | 注册新用户             | `创建账号 user1 123456 123456` |

## 📄 许可证

MIT License

---

## 📣 贡献 & 问题反馈

欢迎通过 [Issues](https://github.com/Asukaaa648/koishi-plugin-jellyfin/issues) 提交 bug、需求或建议！🎉
