import { Context } from 'koishi'
import { Config } from './index'

// Jellyfin 返回结构
interface JellyfinItem {
  Name: string
  Id: string
  ServerId: string
}

interface JellyfinSearchResponse {
  Items: JellyfinItem[]
}

export async function jellyfinSearch(ctx: Context, query: string, config: Config) {
  const url = `${config.JELLYFIN_SERVER_URL}/Items`
  const params = new URLSearchParams({
    api_key: config.API_KEY,
    userId: config.USER_ID,
    SearchTerm: query,
    Recursive: 'true',
    Limit: '10',
    IncludeItemTypes: 'Movie,Series'
  })

  try {
    // 用 ctx.http.get 取代 fetch
    const data = await ctx.http.get<JellyfinSearchResponse>(`${url}?${params.toString()}`)

    if (!data.Items || data.Items.length === 0) {
      return '未检索到内容，请联系管理员添加！'
    } else if (data.Items.length === 1) {
      const item = data.Items[0]
      return `找到 ${item.Name}, 点击下面网址一键打开\n${config.JELLYFIN_EXTERNAL_SERVER_URL}/web/index.html#!/details?id=${item.Id}&context=home&serverId=${item.ServerId}`
    } else {
      let piece = '找到多个项目，列表如下：\n'
      for (const item of data.Items) {
        piece += `${item.Name} ${config.JELLYFIN_EXTERNAL_SERVER_URL}/web/index.html#!/details?id=${item.Id}&context=home&serverId=${item.ServerId}\n`
      }
      return piece
    }
  } catch (err: any) {
    console.error(err)
    return `请求影音服务器时发生异常: ${err?.message || err}`
  }
}
