/**
 * 左邻右舍 store
 * @author LiQingSong
 */

export const state = () => ({
  metaInfo: {
    title: '左邻右舍',
    keywords: '左邻右舍, 友情链接, 超链接, 好友链接, 链接交换, links',
    description: '这里是我的左邻右舍；我的个人链接收藏夹，常用的、实用的、有趣的、有参考性的技术网站。'
  },
  // 数据
  data: [],
  // 推荐
  recommendList: []
})

export const mutations = {
  // 设置数据
  SET_DATA (state, data) {
    state.data = data || []
  },
  SET_RECOMMEND (state, data) {
    state.recommendList = data || []
  }
}

export const actions = {
  async GET_DATA ({ commit, state }) {
    if (state.data.length > 0) {
      return false
    }
    const { data } = await this.$axios({
      url: '/links/list',
      method: 'get'
    })
    commit('SET_DATA', data.data)
  },
  async GET_RECOMMEND ({ commit, state }) {
    if (state.recommendList.length > 0) {
      return false
    }
    const { data } = await this.$axios({
      url: '/links/recommend',
      method: 'get',
      params: {
        ids: 1
      }
    })
    commit('SET_RECOMMEND', data.data)
  }
}
