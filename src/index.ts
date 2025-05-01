import { Context, Schema } from 'koishi'
import { jellyfinSearch } from './search'
import { jellyfinRegisterion } from './register'

export const name = 'jellyfin-plugin'

export interface Config {
  JELLYFIN_SERVER_URL: string
  API_KEY: string
  USER_ID: string
}

export const Config: Schema<Config> = Schema.object({
  JELLYFIN_SERVER_URL: Schema.string().default('http://192.168.1.18:8096').description('Jellyfin 服务器 URL'),
  API_KEY: Schema.string().default('02fe2d4e37124ffdafe45c7fba66f0ad').description('API 密钥'),
  USER_ID: Schema.string().default('d9b458c994d1469b86b17319266f97d8').description('用户 ID'),
})

export function apply(ctx: Context, config: Config) {
  // 注册“搜索”指令
  ctx.command('搜索 <name:text>', '搜索 jellyfin 内容')
    .action(async ({ session }, name) => {
      if (!name) {
        return '请输入你要搜索的内容'
      }
      return await jellyfinSearch(ctx, name, config)
    })

  // 注册“创建账号”指令
  ctx.command('创建账号 <username> <password> <repassword>', '创建 jellyfin 账号')
    .action(async ({ session }, username, password, repassword) => {
      if (!username || !password || !repassword) {
        return '输入有误，请输入: 创建账号 用户名 密码 确认密码'
      }
      if (password !== repassword) {
        return '两次输入的密码不一致，请重新输入'
      }
      return await jellyfinRegisterion(ctx, username, password, config)
    })
}
