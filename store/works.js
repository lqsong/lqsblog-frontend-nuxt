/**
 * 作品 store
 * @author LiQingSong
 */

export const state = () => ({
  // 分类信息
  categoryMetaKey: '/',
  categoryMeta: {
    // 内部结构
    '/': {
      name: '作品',
      title: '作品',
      keywords: '个人作品, 作品展示, 作品欣赏, 作品列表, 李庆松的作品集',
      description: '这里是我的个人作品展示，基本上是《网站开发》作品，包含：html、css、javascript、nodejs、vue、react、php、java、小程序。'
    }
  },
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/works?page={page}'
  },
  // 详情
  detail: {
    title: '',
    keywords: '',
    description: '',
    addtime: '',
    pageview: 0,
    tag: [],
    content: ''
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
    state.detail.tag = data.tag || []
    state.detail.content = data.content || ''
  }
}

export const actions = {
  async GET_DATA ({ commit, state }, params = { page: 1 }) {
    const { data } = await this.$axios({
      url: '/works/list',
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
  async GET_DETAIL ({ commit }, params = { id: '' }) {
    const { data } = await this.$axios({
      url: '/works/detail',
      method: 'get',
      params: {
        id: params.id
      }
    })
    const { title, keywords, description, addtime, hit, tag, content } = data.data || {}
    commit('SET_DETAIL', {
      title,
      keywords,
      description,
      addtime,
      pageview: hit,
      tag,
      content
    })
  }
}
