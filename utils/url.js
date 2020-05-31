import { isExternal } from './validate'
/**
 * 根据类型返回详情url
 * @param {Number} type 1 文章 2 作品
 * @param {Number} id 详情id
 * @author LiQingSong
 */
export function getTypeUrl (type, id) {
  let url = ''
  switch (type) {
    case 1:
      url = `/article/detail/${id}`
      break
    case 2:
      url = `/works/detail/${id}`
      break

    default:
      break
  }
  return url
}

/**
 * 根据类型返回分类url
 * @param {Number} type 1 文章 2 作品
 * @param {String} cname 分类别名
 * @author LiQingSong
 */
export function getTypeClassUrl (type, cname) {
  let url = ''
  switch (type) {
    case 1:
      url = `/article/${cname}`
      break
    case 2:
      url = `/works/${cname}`
      break

    default:
      break
  }
  return url
}

/**
 * 根据url | 链接的字符串返回第一个图片地址
 * @param {String} url | 链接的多个图片地址
 * @author LiQingSong
 */
export function getThumbHref (url) {
  let href = ''
  if (url === null || url === '' || undefined === url) {
    return getThumbNoPic(href)
  }
  href = url.split('|')

  // return href[0]
  return getThumbNoPic(href[0])
}

/**
 * 根据url 判断是否无图
 * @param {String} url 图片地址
 * @author LiQingSong
 */
export function getThumbNoPic (url) {
  if (url === null || url === '' || undefined === url) {
    return '/images/nopic.png'
  }
  return isExternal(url) ? url : '/images/nopic.png'
}
