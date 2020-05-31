/**
 * 专题 store
 * @author LiQingSong
 */

export const state = () => ({
  metaInfo: {
    title: '专题',
    keywords: '文章专题, 作品专题, 专题列表, 技术专题, 前端专题, 后端专题, 网站开发专题',
    description: '这是一个专题列表，包含个人作品专题、个人文章专题、网站开发专题、IT技术专题'
  },
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/topics?page={page}'
  },
  // 详情
  detail: {
    title: '',
    keywords: '',
    description: '',
    addtime: '',
    pageview: 0,
    list: []
  }
})

export const mutations = {
  // 设置列表数据
  SET_DATA (state, data) {
    state.data.list = data.list || []
    state.data.total = data.total || 0
    state.data.currentPage = data.currentPage ? parseInt(data.currentPage, 10) : 1
    if (data.pageUrl) {
      state.data.pageUrl = data.pageUrl
    }
  },
  // 设置详情数据
  SET_DETAIL (state, data) {
    state.detail.title = data.title || ''
    state.detail.keywords = data.keywords || ''
    state.detail.description = data.description || ''
    state.detail.addtime = data.addtime || ''
    state.detail.pageview = data.pageview || 0
    state.detail.list = data.list || []
  }
}

export const actions = {
  async GET_DATA ({ commit, state }, params = { page: 1 }) {
    const { data } = await this.$axios({
      url: '/topics/list',
      method: 'get',
      params: {
        per: state.data.per,
        page: params.page
      }
    })
    const { list, total } = data.data || {}
    commit('SET_DATA', {
      list,
      total,
      currentPage: params.page
    })
  },
  async GET_DETAIL ({ commit }, params = { cname: '' }) {
    const { data } = await this.$axios({
      url: '/topics/detail',
      method: 'get',
      params: {
        alias: params.cname
      }
    })
    const { title, keywords, description, addtime, hit, list } = data.data || {}

    const iList = list.map((item) => {
      const thumb = item.thumb || ''
      return {
        id: item.id || 0,
        type: item.type || 0,
        title: item.title || '',
        description: item.description || '',
        thumb: thumb.split('|'),
        addtime: item.addtime || '',
        category: item.category || {}
      }
    })
    commit('SET_DETAIL', {
      title,
      keywords,
      description,
      addtime,
      pageview: hit,
      list: iList
    })
  }
}
