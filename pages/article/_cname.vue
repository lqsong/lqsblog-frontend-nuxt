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

                <list-item-article :list="dataList"></list-item-article>

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
import ListItemArticle from '@/components/ListItem/article'
import Pagination from '@/components/Pagination'
import { isPageId } from '@/utils/validate'
export default {
  watchQuery: ['page'],
  components: {
    ListItemArticle,
    Pagination
  },
  validate ({ query }) {
    return query.page ? isPageId(query.page) : true
  },
  async fetch ({ store, params, query }) {
    store.commit('SET_ACTIVE_NAV', 'article')
    await store.dispatch('article/GET_CATEGORY_META', { cname: params.cname })
    await store.dispatch('article/GET_DATA', { page: query.page, cname: params.cname })
  },
  computed: {
    ...mapState({
      categoryMetaKey: state => state.article.categoryMetaKey,
      categoryMeta: state => state.article.categoryMeta,
      dataList: state => state.article.data.list,
      total: state => state.article.data.total,
      per: state => state.article.data.per,
      currentPage: state => state.article.data.currentPage,
      pageUrl: state => state.article.data.pageUrl
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
