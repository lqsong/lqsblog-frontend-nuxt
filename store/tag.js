/**
 * 标签 store
 * @author LiQingSong
 */

export const state = () => ({
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/tag/?page={page}'
  },
  // 已经读取判断的标签
  tagreadlist: []
})

export const mutations = {
  // 设置列表数据
  SET_DATA (state, data) {
    state.data.list = data.list || []
    state.data.total = data.total || 0
    state.data.currentPage = data.currentPage ? parseInt(data.currentPage, 10) : 1
    state.data.pageUrl = data.pageUrl
  },
  // 设置已经读取判断的标签
  SET_TAGREADLIST (state, tagname) {
    state.tagreadlist.push(tagname)
  }
}

export const actions = {
  async GET_DATA ({ commit, state }, params = { page: 1, tagname: '' }) {
    const { data } = await this.$axios({
      url: '/tag/list',
      method: 'get',
      params: {
        per: state.data.per,
        page: params.page,
        name: params.tagname
      }
    })
    const { list, total } = data.data || {}
    commit('SET_DATA', {
      list,
      total,
      currentPage: params.page,
      pageUrl: '/tag/' + params.tagname + '?page={page}'
    })
  },
  async GET_TAGREADLIST ({ commit, state }, params = { tagname: '' }) {
    if (state.tagreadlist.includes(params.tagname)) {
      return false
    }
    const { data } = await this.$axios({
      url: '/tag/detail',
      method: 'get',
      params: {
        name: params.tagname
      }
    })
    const { code } = data
    if (code === 0) {
      commit('SET_TAGREADLIST', params.tagname)
    }
  }
}
