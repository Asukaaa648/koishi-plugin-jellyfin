import fetch from 'node-fetch'
import { Context } from 'koishi'
import { Config } from './index'  // 导入 Config 类型

export async function jellyfinRegisterion(ctx: Context, username: string, password: string, config: Config): Promise<string> {
  try {
    const { JELLYFIN_SERVER_URL, API_KEY } = config
    // 创建用户
    const jsonData = {
      Name: username,
      Password: password,
    }

    const params = new URLSearchParams({
      api_key: API_KEY,
    })

    const response = await fetch(`${JELLYFIN_SERVER_URL}/Users/New?${params.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 400) {
        return '该用户名已被注册'
      } else {
        return `http服务出现问题: ${response.status} ${errorText}\n请联系管理员处理！`
      }
    }

    return `注册成功！\n用户名为${username},密码为${password},之后可自行修改密码`

  } catch (err) {
    return `其他问题: ${err}\n请联系管理员处理！`
  }
}
