<template>
  <div>
      <div class="lqsblog-list-header bg-light py-4 py-lg-5">
        <div class="container">
          <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">
                  <h1 class="h3">
                    搜索：<span class="lqsblog-list-h-title">{{ title }}</span>
                  </h1>
              </div>
          </div>
        </div>
      </div>

      <div class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

                <template v-if="dataList.length > 0">

                    <list-item :list="dataList"></list-item>

                    <nav>
                    <pagination :total="total" :page-size="per" :current-page="currentPage" :page-url="pageUrl"></pagination>
                    </nav>
                </template>

                <div v-else class="pb-4 pb-md-5">
                    <div class="container">
                        <div class="row justify-content-lg-center py-5">
                        <div class="col-12 col-lg-9">
                            <div class="lqsblog-no-data">
                                <p><img src="~assets/images/nodata.gif" alt=""></p>
                                <h2>Oh, what a shame!</h2>
                                <p>抱歉，没有你要找的内容...</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from '@/components/ListItem'
import Pagination from '@/components/Pagination'
import { isPageId } from '@/utils/validate'
export default {
  watchQuery: ['page'],
  components: {
    ListItem,
    Pagination
  },
  validate ({ params, query }) {
    return params.keyword && (query.page ? isPageId(query.page) : true)
  },
  async fetch ({ store, params, query }) {
    store.commit('SET_ACTIVE_NAV', '')
    await store.dispatch('search/GET_DATA', { page: query.page, keyword: params.keyword })
  },
  asyncData ({ params }) {
    return { title: params.keyword }
  },
  computed: {
    ...mapState({
      dataList: state => state.search.data.list,
      total: state => state.search.data.total,
      per: state => state.search.data.per,
      currentPage: state => state.search.data.currentPage,
      pageUrl: state => state.search.data.pageUrl
    })
  },
  head () {
    return {
      title: this.title + ' - 搜索',
      meta: []
    }
  }
}
</script>
