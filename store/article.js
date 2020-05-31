/**
 * 文章 store
 * @author LiQingSong
 */

export const state = () => ({
  // 分类信息
  categoryMetaKey: '',
  categoryMeta: {
    /*
    // 内部结构
    '/': {
      name: '',
      title: '',
      keywords: '',
      description: ''
    }
    */
  },
  // 分页列表
  data: {
    list: [],
    total: 0,
    per: 10,
    currentPage: 1,
    pageUrl: '/article?page={page}'
  },
  // 详情
  detail: {
    title: '',
    keywords: '',
    description: '',
    addtime: '',
    pageview: 0,
    category: {
      cname: '',
      title: ''
    },
    tag: [],
    content: '',
    interestIds: ''
  },
  // 可能感兴趣文章
  interest: []
})

export const mutations = {
  // 设置当前分类key
  SET_CATEGORY_META_KEY (state, keyName) {
    state.categoryMetaKey = keyName
  },
  // 设置分类信息数据
  SET_CATEGORY_META (state, data) {
    const key = data.key
    state.categoryMeta[key] = data.val
    /*
    state.categoryMeta[key].id = val.id || ''
    state.categoryMeta[key].name = val.name || ''
    state.categoryMeta[key].title = val.title || ''
    state.categoryMeta[key].keywords = val.keywords || ''
    state.categoryMeta[key].description = val.description || '' */
  },
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
    state.detail.category = data.category || { cname: '', title: '' }
    state.detail.tag = data.tag || []
    state.detail.content = data.content || ''
    state.detail.interestIds = data.interestIds || ''
  },
  // 设置感兴趣文章
  SET_INTEREST (state, data) {
    state.interest = data
  }
}

export const actions = {
  async GET_CATEGORY_META ({ commit, state }, params = { cname: '' }) {
    const cname = (params.cname && params.cname !== '') ? params.cname : '/'
    commit('SET_CATEGORY_META_KEY', cname)

    if (state.categoryMeta[cname]) {
      return state.categoryMeta[cname]
    }

    const { data } = await this.$axios({
      url: '/article/category',
      method: 'get',
      params: {
        alias: params.cname
      }
    })
    const { id, name, title, keywords, description } = data.data || {}
    const val = {
      id,
      name,
      title,
      keywords,
      description
    }
    commit('SET_CATEGORY_META', {
      key: cname,
      val
    })

    return val
  },
  async GET_DATA ({ commit, state }, params = { page: 1, cname: '' }) {
    const category = state.categoryMeta[params.cname] || {}

    const { data } = await this.$axios({
      url: '/article/list',
      method: 'get',
      params: {
        per: state.data.per,
        page: params.page,
        categoryId: category.id || ''
      }
    })
    const { list, total } = data.data || {}
    commit('SET_DATA', {
      list,
      total,
      currentPage: params.page,
      pageUrl: params.cname ? '/article/' + params.cname + '?page={page}' : '/article?page={page}'
    })
  },
  async GET_DETAIL ({ commit }, params = { id: '' }) {
    const { data } = await this.$axios({
      url: '/article/detail',
      method: 'get',
      params: {
        id: params.id
      }
    })
    const { title, keywords, description, addtime, hit, category, tag, content, interestIds } = data.data || {}
    commit('SET_DETAIL', {
      title,
      keywords,
      description,
      addtime,
      pageview: hit,
      category: { cname: category.alias, title: category.name },
      tag,
      content,
      interestIds
    })
  },
  async GET_INTEREST ({ commit }, params = { ids: '' }) {
    if (params.ids === '' || params.ids === null || undefined === params.ids) {
      commit('SET_INTEREST', [])
      return []
    }
    const { data } = await this.$axios({
      url: '/article/interest',
      method: 'get',
      params: {
        ids: params.ids
      }
    })
    commit('SET_INTEREST', data.data || [])
  }
}
