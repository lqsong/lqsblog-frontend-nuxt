/* eslint-disable */
/**
 * 百度seo-自动 push 脚本
 * https://zz.bdstatic.com/linksubmit/push.js
 * http://push.zhanzhang.baidu.com/push.js
 * @author LiQingSong
 */
if (process.env.NODE_ENV === 'production') {
  const baiduPush = href => {
    !function(){
      const e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi
      const r = href || window.location.href
      const t = document.referrer
      if (!e.test(r)) {
        let o = "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif"
        t ? (o += "?r=" + encodeURIComponent(document.referrer), r && (o += "&l=" + r)) : r && (o += "?l=" + r)
        let i = new Image
        i.src = o
      }
    }(window)
  }

  baiduPush()

  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', to => {
      baiduPush(window.location.origin + to.fullPath)
    })
  })
}

