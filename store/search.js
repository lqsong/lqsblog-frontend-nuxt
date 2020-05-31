/**
 * 搜索 store
 * @author LiQingSong
 */

export const state = () => ({
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/search?page={page}'
  }
})

export const mutations = {
  SET_DATA (state, data) {
    state.data.list = data.list || []
    state.data.total = data.total || 0
    state.data.currentPage = data.currentPage ? parseInt(data.currentPage, 10) : 1
    if (data.pageUrl) {
      state.data.pageUrl = data.pageUrl
    }
  }
}

export const actions = {
  async GET_DATA ({ commit, state }, params = { page: 1, keyword: '' }) {
    const { data } = await this.$axios({
      url: '/search',
      method: 'get',
      params: {
        per: state.data.per,
        page: params.page,
        keywords: params.keyword
      }
    })
    const { list, total } = data.data || {}
    commit('SET_DATA', {
      list,
      total,
      currentPage: params.page,
      pageUrl: '/search/' + params.keyword + '?page={page}'
    })
  }
}
