/**
 * $axios 统一处理
 * @author LiQingSong
 */
export default function ({ $axios, store, redirect, error }) {
  // 发出请求前
  $axios.onRequest((config) => {
    // console.log('1、Making request to ' + JSON.stringify(config))
    // console.log('1、request to ' + config.url)

    // 解决get请求浏览器缓存问题
    if (config.method === 'get') {
      const url = config.url
      const index = url.indexOf('?')
      index === -1 ? config.url = url + '?_=' + (new Date().getTime()) : config.url = url + '&_=' + (new Date().getTime())
    }

    // 请根据实际情况修改
    if (store.getters.token) {
      // store.getters.token 加载时提前获取
      // 让每个请求携带令牌
      config.headers['X-Token'] = store.getters.token
    }
  })

  // 响应拦截器
  $axios.onResponse((response) => {
    // console.log('2、response to ' + JSON.stringify(response))

    const res = response.data
    const { code } = res

    // console.log('2、response to ' + code)

    if (code !== 0) {
      const statusCode = [404].includes(code) ? code : 500
      error({ statusCode, message: '应用发生错误异常...' })
    }
  })

  // 服务器错误
  $axios.onError((error) => {
    console.log('3、onError to ' + error)

    /* const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } */
    error()
  })

  $axios.onRequestError((error) => {
    console.log('4、onRequestError to ' + error)

    error({ statusCode: 400, message: '请求发生错误...' })
  })

  $axios.onResponseError((error) => {
    console.log('5、onResponseError to ' + error)

    error({ statusCode: 400, message: '响应发生错误...' })
  })
}
