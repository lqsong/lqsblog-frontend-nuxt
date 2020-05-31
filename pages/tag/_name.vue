<template>
  <div>
      <div class="lqsblog-list-header bg-light py-4 py-lg-5">
        <div class="container">
          <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">
                  <h1 class="h3">
                    标签：<span class="lqsblog-list-h-title">{{ title }}</span>
                  </h1>
              </div>
          </div>
        </div>
      </div>

      <div class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

                <list-item :list="dataList"></list-item>

                <nav>
                  <pagination :total="total" :page-size="per" :current-page="currentPage" :page-url="pageUrl"></pagination>
                </nav>

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
    return params.name && (query.page ? isPageId(query.page) : true)
  },
  async fetch ({ store, params, query }) {
    store.commit('SET_ACTIVE_NAV', '')
    await store.dispatch('tag/GET_TAGREADLIST', { tagname: params.name })
    await store.dispatch('tag/GET_DATA', { page: query.page, tagname: params.name })
  },
  asyncData ({ params }) {
    return { title: params.name }
  },
  computed: {
    ...mapState({
      dataList: state => state.tag.data.list,
      total: state => state.tag.data.total,
      per: state => state.tag.data.per,
      currentPage: state => state.tag.data.currentPage,
      pageUrl: state => state.tag.data.pageUrl
    })
  },
  head () {
    return {
      title: this.title + ' - 标签',
      meta: []
    }
  }
}
</script>
