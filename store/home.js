/**
 * 首页 store
 * @author LiQingSong
 */

export const state = () => ({
  // 推荐列表
  recommendList: [],
  recommendListIds: '',
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/?page={page}'
  }
})

export const mutations = {
  SET_RECOMMEND (state, data) {
    state.recommendList = data.list || []
    state.recommendListIds = data.ids || ''
  },
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
  async GET_RECOMMEND ({ commit, state }) {
    if (state.recommendList.length > 0) {
      return false
    }
    const { data } = await this.$axios({
      url: '/index/recommend',
      method: 'get'
    })
    const arr = data.data || []
    const len = 5
    const setArr = []
    let ids = ''
    for (let index = 0; index < len; index++) {
      const element = arr[index]
      if (element) {
        setArr.push(element)
        if (ids === '') {
          ids = element.sid
        } else {
          ids = ids + ',' + element.sid
        }
      } else {
        setArr.push({})
        /*
        {
          id: '',
          type: 0,
          title: '',
          thumb: ''
        }
        */
      }
    }
    commit('SET_RECOMMEND', {
      list: setArr,
      ids
    })
  },
  async GET_DATA ({ commit, state }, params = { page: 1 }) {
    const { data } = await this.$axios({
      url: '/index/list',
      method: 'get',
      params: {
        per: state.data.per,
        page: params.page,
        noSid: state.recommendListIds
      }
    })
    const { list, total } = data.data || {}
    commit('SET_DATA', {
      list,
      total,
      currentPage: params.page
    })
  }
}
