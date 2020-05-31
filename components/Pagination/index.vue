<template>
    <div v-if="isPrePage || isNextPage" class="row">
        <div class="col-8">
            <ul class="pagination lqsblog-pagination">
              <li v-for="item in pages" :key="item" :class="{'active': currentPage === item}" class="page-item">
                  <nuxt-link v-if="currentPage !== item" class="page-link" :to="getPageUrl(item)">{{ item }}</nuxt-link>
                  <span v-else class="page-link">{{ item }}</span>
              </li>
            </ul>
        </div>
        <div class="col-4">
            <ul class="pagination lqsblog-pagination justify-content-end">
              <li v-if="isPrePage" class="page-item">
                <nuxt-link class="page-link page-pre-next" :to="getPageUrl(prePage)">&lt;</nuxt-link>
              </li>
              <li v-if="isNextPage" class="page-item">
                <nuxt-link class="page-link page-pre-next" :to="getPageUrl(nextPage)">&gt;</nuxt-link>
              </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Pagination from '@/utils/pagination'
export default {
  name: 'Pagination',
  props: {
    // 总数
    total: {
      type: Number,
      default: 0
    },
    // 当前页面
    currentPage: {
      type: Number,
      default: 1
    },
    pageUrl: {
      type: String,
      default: '#'
    },
    // 每页多少条数据
    pageSize: {
      type: Number,
      default: 10
    },
    // 分页栏显示几个页码 - 请填写大于2的奇数
    rollPage: {
      type: Number,
      default: 5
    }
  },
  data () {
    const page = new Pagination(this.total, this.currentPage, this.pageSize, this.rollPage)
    return {
      page,
      pages: page.getPages(),
      prePage: page.prePage,
      nextPage: page.nextPage,
      isPrePage: page.isPrePage,
      isNextPage: page.isNextPage
    }
  },
  // ?page=1 时 nuxt 不更新组件 , 所以监听
  watch: {
    currentPage (v) {
      // console.log(v, '监听分页执行')
      this.setPage(v)
    }
  },
  methods: {
    getPageUrl (pageVal) {
      return this.pageUrl.replace('{page}', pageVal)
    },
    setPage (pageVal) {
      this.page.setPage(pageVal)
      this.pages = this.page.getPages()
      this.prePage = this.page.prePage
      this.nextPage = this.page.nextPage
      this.isPrePage = this.page.isPrePage
      this.isNextPage = this.page.isNextPage
    }
  }
}
</script>
