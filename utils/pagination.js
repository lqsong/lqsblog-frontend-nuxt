/**
*  分页计算
* total             : 总数 （必填）
* currentPage       : 当前页码 （必填）
* pageSize          : 每页显示多少条
* rollPage          : 分页栏显示几个页码 请填写大于2的奇数
* @author LiQingSong
*/
function Pagination (total, currentPage, pageSize, rollPage) {
  const _this = this

  // 总记录数
  _this.total = total

  // 每页显示条数
  _this.pageSize = pageSize || 10

  // 总页数(也是最后一页的页码)
  _this.totalPages = Math.ceil(_this.total / _this.pageSize)

  // 设置页码
  _this.setPage(currentPage)

  // 分页栏显示几个页码
  _this.rollPage = rollPage || 5
}

// 设置页码 当点击分页时调用
Pagination.prototype.setPage = function (currentPage) {
  const _this = this
  // 当前页码
  _this.currentPage = currentPage > _this.totalPages ? _this.totalPages : (currentPage < 1 ? 1 : currentPage)

  // 上一页
  _this.prePage = _this.currentPage - 1

  // 下一页
  _this.nextPage = _this.currentPage + 1

  // 是否显示上一页
  _this.isPrePage = _this.prePage > 0

  // 是否显示下一页
  _this.isNextPage = !(_this.nextPage > _this.totalPages)

  // 是否显示第一页(<<)
  _this.isFirstPage = _this.currentPage !== 1

  // 是否显示最后一页(>>)
  _this.isLastPage = _this.currentPage !== _this.totalPages
}

// 设置分页列表的开始分页-截止分页 - 可以单独调用直接在页面循环
Pagination.prototype.setPages = function () {
  const _this = this
  // 设置步长
  _this.step = Math.floor(_this.rollPage / 2)

  // 分页列表 - 开始分页
  let startPoor = 0
  _this.pagesStartPage = _this.currentPage - _this.step
  if (_this.pagesStartPage < 1) {
    startPoor = 1 - _this.pagesStartPage
    _this.pagesStartPage = 1
  }

  // 分页列表 - 截止分页
  let endPoor = 0
  _this.pagesEndPage = _this.currentPage + _this.step
  if (_this.pagesEndPage > _this.totalPages) {
    endPoor = _this.pagesEndPage - _this.totalPages
    _this.pagesEndPage = _this.totalPages
  }

  // 分页列表 - 开始分页 - 重置
  _this.pagesStartPage = _this.pagesStartPage - endPoor
  _this.pagesStartPage = _this.pagesStartPage < 1 ? 1 : _this.pagesStartPage

  // 分页列表 - 截止分页 - 重置
  _this.pagesEndPage = _this.pagesEndPage + startPoor
  _this.pagesEndPage = _this.pagesEndPage > _this.totalPages ? _this.totalPages : _this.pagesEndPage
}

// 获取分页列表数组
Pagination.prototype.getPages = function () {
  const _this = this
  _this.setPages()
  let index = _this.pagesStartPage
  const arr = []
  for (index; index <= _this.pagesEndPage; index++) {
    arr.push(index)
  }
  return arr
}

export default Pagination
