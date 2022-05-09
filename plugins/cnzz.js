/*
** 只在生产模式的客户端中使用
*/
if (process.client && process.env.NODE_ENV === 'production') {
  const cnzzStat = () => {
    (function () {
    /*  const sOne = document.getElementsByTagName('script')[0]
    console.log(sOne.src) */

      document.getElementById('cnzz_stat') && document.getElementById('cnzz_stat').remove()

      const cnzzScript = document.createElement('script')
      // cnzzScript.src = 'https://s5.cnzz.com/z_stat.php?id=1275873331&web_id=1275873331&t=' + new Date().getTime()
      cnzzScript.src = 'https://hm.baidu.com/hm.js?fbad933e32f60c6e1522c7313e0808f8&t=' + new Date().getTime()
      cnzzScript.id = 'cnzz_stat'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(cnzzScript, s)
    })()
  }

  cnzzStat()

  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to) => {
      cnzzStat()
    })
  })
}
