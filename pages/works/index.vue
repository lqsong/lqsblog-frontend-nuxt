<template>
  <div>
      <div class="lqsblog-list-header bg-light py-4 py-lg-5">
        <div class="container">
          <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">
                  <h1 class="h3">
                    <span class="lqsblog-list-h-title">{{ metaInfo.name }}</span>
                  </h1>
                  <div class="mt-2 mt-md-3">
                    <p>{{ metaInfo.description }}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>

      <div class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

                <list-item-works :list="dataList"></list-item-works>

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
import ListItemWorks from '@/components/ListItem/works'
import Pagination from '@/components/Pagination'
import { isPageId } from '@/utils/validate'
export default {
  watchQuery: ['page'],
  components: {
    ListItemWorks,
    Pagination
  },
  validate ({ query }) {
    return query.page ? isPageId(query.page) : true
  },
  async fetch ({ store, query }) {
    store.commit('SET_ACTIVE_NAV', 'works')
    await store.dispatch('works/GET_DATA', { page: query.page })
  },
  computed: {
    ...mapState({
      categoryMetaKey: state => state.works.categoryMetaKey,
      categoryMeta: state => state.works.categoryMeta,
      dataList: state => state.works.data.list,
      total: state => state.works.data.total,
      per: state => state.works.data.per,
      currentPage: state => state.works.data.currentPage,
      pageUrl: state => state.works.data.pageUrl
    }),
    metaInfo () {
      return this.categoryMeta[this.categoryMetaKey] || {}
    }
  },
  head () {
    return {
      title: this.metaInfo.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.metaInfo.keywords },
        { hid: 'description', name: 'description', content: this.metaInfo.description }
      ]
    }
  }
}
</script>
