<template>
    <ul class="pagination "><!-- justify-content-center -->
        <li class="page-item" :class="{'disabled': !isPrePage}">
            <nuxt-link class="page-link" :to="getPageUrl(prePage)">&laquo;</nuxt-link>
        </li>

        <li v-for="item in pages" :key="item" :class="{'active': currentPage === item}" class="page-item">
            <nuxt-link v-if="currentPage !== item" class="page-link" :to="getPageUrl(item)">{{ item }}</nuxt-link>
            <span v-else class="page-link">{{ item }}</span>
        </li>

        <li class="page-item" :class="{'disabled': !isNextPage}">
            <nuxt-link class="page-link" :to="getPageUrl(nextPage)">&raquo;</nuxt-link>
        </li>
    </ul>
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
      pages: page.getPages(),
      prePage: page.prePage,
      nextPage: page.nextPage,
      isPrePage: page.isPrePage,
      isNextPage: page.isNextPage
    }
  },
  methods: {
    getPageUrl (pageVal) {
      return this.pageUrl.replace('{page}', pageVal)
    }
  }
}
</script>
