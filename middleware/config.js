/**
 * 中间件 在其他所有路由请求前
 * 主要作用 在路由请求前，可以在此获取 token 供其他ajax请求头使用
 * @author LiQingSong
 */
export default async function ({ store, route }) {
  // console.log(route)
  if (store.state.config.siteCreationTime === '') {
    await store.dispatch('GET_CONFIG')
  }
}
