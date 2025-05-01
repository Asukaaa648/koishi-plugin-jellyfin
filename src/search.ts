import fetch from 'node-fetch'
import { Context } from 'koishi'
import { Config } from './index'

// 声明 Jellyfin 响应的类型
interface JellyfinItem {
  Name: string
  Id: string
  ServerId: string
}

interface JellyfinSearchResponse {
  Items: JellyfinItem[]  // 确保 Items 是数组
}

export async function jellyfinSearch(ctx: Context, query: string, config: Config) {
  const url = `${config.JELLYFIN_SERVER_URL}/Items`
  const params = new URLSearchParams({
    api_key: config.API_KEY,
    userId: config.USER_ID,
    SearchTerm: query,
    Recursive: 'true',
    Limit: '10',
  })

  try {
    const response = await fetch(`${url}?${params.toString()}`)
    if (!response.ok) {
      const text = await response.text()
      return `请求影音服务器时发生错误: ${response.status} ${text}`
    }

    const data = (await response.json()) as JellyfinSearchResponse

    if (!data.Items || data.Items.length === 0) {
      return '未检索到内容，请联系管理员添加！'
    } else if (data.Items.length === 1) {
      const item = data.Items[0]
      const name = item.Name
      const itemId = item.Id
      const serverId = item.ServerId
      return `找到 ${name}, 点击下面网址一键打开\nhttps://jf.gjiang.xyz:4443/web/index.html#!/details?id=${itemId}&context=home&serverId=${serverId}`
    } else {
      let piece = '找到多个项目，列表如下：\n'
      for (const item of data.Items) {
        const name = item.Name
        const itemId = item.Id
        const serverId = item.ServerId
        piece += `${name} https://jf.gjiang.xyz:4443/web/index.html#!/details?id=${itemId}&context=home&serverId=${serverId}\n`
      }
      return piece
    }
  } catch (err) {
    console.error(err)
    return `请求影音服务器时发生异常: ${err}`
  }
}
