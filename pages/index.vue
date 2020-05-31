<template>
  <div>
    <div v-if="page === 1 " class="container pt-4 pt-lg-5">
      <div class="row justify-content-lg-center">
          <div class="col-12 col-lg-9">
              <div class="row row-sm">
                  <div v-if="recommendList[0]" class="col-12 col-sm-6 mb-2 mb-sm-0">
                    <div class="lqsblog-media shadow-2x">
                       <nuxt-link class="lqsblog-media-content" :title="recommendList[0]['title']" :style="{'background-image': 'url(' + getHref(recommendList[0]['thumb']) + ')'}" :to="getUrl(recommendList[0]['type'], recommendList[0]['id'])">
                            <div class="lqsblog-media-hover"></div>
                            <div class="title h5 text-center px-3"><span class=" h-2x">{{ recommendList[0]['title'] }}</span></div>
                        </nuxt-link>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="row row-sm mb-2 mb-md-3">
                        <div class="col-6">
                            <div class="lqsblog-media shadow-2x">
                                 <nuxt-link class="lqsblog-media-content" :title="recommendList[1]['title']" :style="{'background-image': 'url(' + getHref(recommendList[1]['thumb']) + ')'}" :to="getUrl(recommendList[1]['type'], recommendList[1]['id'])">
                                    <div class="lqsblog-media-hover"></div>
                                    <div class="title h6 text-center px-3"><span class=" h-2x">{{ recommendList[1]['title'] }}</span></div>
                                  </nuxt-link>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="lqsblog-media shadow-2x">
                                 <nuxt-link class="lqsblog-media-content" :title="recommendList[2]['title']" :style="{'background-image': 'url(' + getHref(recommendList[2]['thumb']) + ')'}" :to="getUrl(recommendList[2]['type'], recommendList[2]['id'])">
                                    <div class="lqsblog-media-hover"></div>
                                    <div class="title h6 text-center px-3"><span class=" h-2x">{{ recommendList[2]['title'] }}</span></div>
                                  </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sm">
                        <div class="col-6">
                            <div class="lqsblog-media shadow-2x">
                                 <nuxt-link class="lqsblog-media-content" :title="recommendList[3]['title']" :style="{'background-image': 'url(' + getHref(recommendList[3]['thumb']) + ')'}" :to="getUrl(recommendList[3]['type'], recommendList[3]['id'])">
                                    <div class="lqsblog-media-hover"></div>
                                    <div class="title h6 text-center px-3"><span class=" h-2x">{{ recommendList[3]['title'] }}</span></div>
                                  </nuxt-link>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="lqsblog-media shadow-2x">
                                 <nuxt-link class="lqsblog-media-content" :title="recommendList[4]['title']" :style="{'background-image': 'url(' + getHref(recommendList[4]['thumb']) + ')'}" :to="getUrl(recommendList[4]['type'], recommendList[4]['id'])">
                                    <div class="lqsblog-media-hover"></div>
                                    <div class="title h6 text-center px-3"><span class=" h-2x">{{ recommendList[4]['title'] }}</span></div>
                                  </nuxt-link>
                            </div>
                        </div>
                    </div>
                  </div>

              </div>
          </div>
      </div>
    </div>

    <div class="container pt-4 pt-lg-5">
      <div class="row justify-content-lg-center">
          <div class="col-12 col-lg-9">

              <list-item :list="dataList"></list-item>

              <nav>
                  <pagination ref="pagination" :total="total" :page-size="per" :current-page="currentPage" :page-url="pageUrl"></pagination>
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
import { getTypeUrl, getThumbHref } from '@/utils/url'
export default {
  watchQuery: ['page'],
  components: {
    ListItem,
    Pagination
  },
  validate ({ query }) {
    return query.page ? isPageId(query.page) : true
  },
  async fetch ({ store, query }) {
    store.commit('SET_ACTIVE_NAV', 'home')
    await store.dispatch('links/GET_RECOMMEND')
  },
  async asyncData ({ params, query, app, store }) {
    const page = query.page ? parseInt(query.page, 10) : 1
    if (page === 1) {
      await store.dispatch('home/GET_RECOMMEND')
    }
    await store.dispatch('home/GET_DATA', { page: query.page })
    return {
      page
    }
  },
  computed: {
    ...mapState({
      keywords: state => state.config.keywords,
      description: state => state.config.description,
      recommendList: state => state.home.recommendList,
      dataList: state => state.home.data.list,
      total: state => state.home.data.total,
      per: state => state.home.data.per,
      currentPage: state => state.home.data.currentPage,
      pageUrl: state => state.home.data.pageUrl
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
      title: '首页',
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
