<template>
  <div class="container pt-4 pt-lg-5">
    <div class="row justify-content-lg-center">
      <div class="col-12 col-lg-9 py-4 py-lg-5">

              <h1 class="h3 mb-4">Topics</h1>

              <div class="row my-n2 m-lg-n4">

                  <div v-for="(item, index) in dataList" :key="index" class="col-12 col-lg-6 py-2 p-lg-4">
                      <div class="card m-0 py-md-2">
                          <div class="card-header d-flex pt-4 pb-0">
                              <div class="pr-2 text-lg text-primary">
                                  <svg class="icon" aria-hidden="true">
                                      <use xlink:href="#lqsblog-eidt"></use>
                                  </svg>
                              </div>
                              <div>
                                  <div class="h5 h-1x">
                                      <nuxt-link :to="`/topics/detail/${item.alias}`">{{ item.title }}</nuxt-link>
                                  </div>
                                  <div class="text-xs text-muted mt-2">
                                      <span class="d-inline-block">{{ item.quantity }} 篇文章</span>
                                  </div>
                              </div>
                          </div>
                          <div class="lqsblog-list-grid">

                              <div v-for="(item2, index2) in item['conlist']" :key="index2" class="lqsblog-list-item">
                                  <div class="lqsblog-media w-48">
                                      <nuxt-link class="lqsblog-media-content rounded-circle" :to="getUrl(item2.type, item2.id)" :style="{'background-image': 'url(' + getHref(item2.thumb) + ')'}"></nuxt-link>
                                  </div>
                                  <div class="lqsblog-list-content ">
                                      <div class="lqsblog-list-body ">
                                          <nuxt-link class="text-sm text-secondary h-2x" :to="getUrl(item2.type, item2.id)">{{ item2.title }}</nuxt-link>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>

              </div>

              <nav>
                <pagination :total="total" :page-size="per" :current-page="currentPage" :page-url="pageUrl"></pagination>
              </nav>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { isPageId } from '@/utils/validate'
import { getTypeUrl, getThumbHref } from '@/utils/url'
export default {
  watchQuery: ['page'],
  components: {
    Pagination
  },
  validate ({ query }) {
    return query.page ? isPageId(query.page) : true
  },
  async fetch ({ store, query }) {
    store.commit('SET_ACTIVE_NAV', 'topics')
    await store.dispatch('topics/GET_DATA', { page: query.page })
  },
  computed: {
    ...mapState({
      metaInfo: state => state.topics.metaInfo,
      dataList: state => state.topics.data.list,
      total: state => state.topics.data.total,
      per: state => state.topics.data.per,
      currentPage: state => state.topics.data.currentPage,
      pageUrl: state => state.topics.data.pageUrl
    })
  },
  methods: {
    getUrl (type, id) {
      return getTypeUrl(type, id)
    },
    getHref (url) {
      return getThumbHref(url)
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
