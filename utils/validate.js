/**
 * 验证页码（或id）大于0的数字
 * @param {Number} val
 * @author LiQingSong
 */
export function isPageId (val) {
  if (!val) { return false }
  val = parseInt(val, 10)
  if (val < 1) { return false }
  return /^\d+$/.test(val)
}

/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author LiQingSong
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
