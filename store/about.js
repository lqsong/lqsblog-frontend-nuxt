/**
 * 关于 store
 * @author LiQingSong
 */

export const state = () => ({
  // 数据
  data: {
    title: '',
    keywords: '',
    description: '',
    content: ''
  }
})

export const mutations = {
  // 设置数据
  SET_DATA (state, data) {
    state.data.title = data.title || ''
    state.data.keywords = data.keywords || ''
    state.data.description = data.description || ''
    state.data.content = data.content || ''
  }
}

export const actions = {
  async GET_DATA ({ commit, state }) {
    if (state.data.content !== '') {
      return false
    }
    const { data } = await this.$axios({
      url: '/about',
      method: 'get'
    })
    const { title, keywords, description, content } = data.data || {}
    commit('SET_DATA', {
      title,
      keywords,
      description,
      content
    })
  }
}
