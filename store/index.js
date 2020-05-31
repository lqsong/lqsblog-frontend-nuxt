/**
 * 全局 store
 * @author LiQingSong
 */

export const state = () => ({
  config: {
    // 站点创建时间
    siteCreationTime: '',
    // 研发人
    developedBy: {
      name: 'lqsBlog',
      url: 'http://www.liqingsong.cc'
    },
    // 备案
    ICP: '浙ICP备16042703号',
    keywords: '',
    description: ''
  },
  // 选中导航
  activeNav: ''
})

export const mutations = {
  // 设置导航选中链接
  SET_ACTIVE_NAV (state, navName) {
    state.activeNav = navName
  },
  SET_CONFIG (state, data) {
    state.config.siteCreationTime = data.siteCreationTime
    state.config.developedBy.name = data.developedBy.name
    state.config.developedBy.url = data.developedBy.url
    state.config.ICP = data.ICP
    state.config.keywords = data.keywords
    state.config.description = data.description
  }
}

export const actions = {
  async GET_CONFIG ({ commit, state }) {
    if (state.config.siteCreationTime !== '') {
      return false
    }
    const { data } = await this.$axios({
      url: '/config',
      method: 'get'
    })
    const { siteCreationTime, copyrightPerson, copyrightUrl, icp, keywords, description } = data.data || {}
    commit('SET_CONFIG', {
      siteCreationTime,
      developedBy: {
        name: copyrightPerson,
        url: copyrightUrl
      },
      ICP: icp,
      keywords,
      description
    })
  }
}

export const getters = {
  siteCreationTime: state => state.config.siteCreationTime,
  developedBy: state => state.config.developedBy,
  ICP: state => state.config.ICP,
  activeNav: state => state.activeNav,
  linksRecommend: state => state.links.recommendList
}
