# koishi-plugin-jellyfin

连接 [Jellyfin](https://jellyfin.org/)，支持用户注册、媒体库内搜索等功能的 Koishi 插件。

![npm](https://img.shields.io/npm/v/koishi-plugin-jellyfin)
![license](https://img.shields.io/github/license/Asukaaa648/koishi-plugin-jellyfin)

## ✨ 功能特性

- ✅ Jellyfin 用户注册
- ✅ Jellyfin 媒体库搜索
- ✅ 通过 Koishi 指令一键操作

## 🛠️ 配置

安装插件后，在 Koishi 控制台的 **“插件配置” → “jellyfin”** 页面中填写以下信息：

| 配置项                | 说明                | 默认值                     |
| --------------------- | ------------------- | -------------------------- |
| `JELLYFIN_SERVER_URL` | Jellyfin 服务器地址 | `http://192.168.1.18:8096` |
| `API_KEY`             | Jellyfin API 密钥   | （必填）                   |
| `USER_ID`             | 默认用户 ID         | （必填）                   |

⚠️ 请确保 `API_KEY` 和 `USER_ID` 已在 Jellyfin 管理员界面中获取。
### 获取方式：
`USER_ID`：控制台-用户-选择一个用户-此时浏览器的地址中就有这个用户的userid，复制到koishi控制台中。
`API_KEY`：控制台-API 密钥-左上角“+”号，复制API到koishi控制台中。
备注：`USER_ID`是一个用户的id，他限制了搜索的范围大小，比如现在有3个媒体库（1、2、3），现在创建一个用户user1，他只有媒体库1的访问权，那么使用他的userid搜索，只能在媒体库1中搜索，2、3无法搜索。


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
