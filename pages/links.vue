<template>
  <div class="container pt-4 pt-lg-5">
    <div class="row justify-content-lg-center">
        <div class="col-12 col-lg-9 py-4 py-lg-5">

          <h1 class="h3 mb-4">左邻右舍</h1>

          <div v-for="(item, index) in datalist" :key="index" class="m-0 py-md-2">
              <div class="d-flex pt-4 pb-0">
                <div class="pr-2 text-lg text-primary">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#lqsblog-links-fill"></use>
                  </svg>
                </div>
                <div>
                  <div class="h5 h-1x"><a>{{ item.name }}</a></div>
                  <div class="text-xs text-muted mt-2">
                    <span class="d-inline-block"></span>
                  </div>
                </div>
              </div>

              <div class="row lqsblog-list-grid">

                  <div v-for="(item2, index2) in item['children']" :key="index2" class="col-md-6">
                    <div class="lqsblog-list-item">
                      <div class="lqsblog-media w-48">
                        <a class="lqsblog-media-content rounded-circle" :href="item2.href" target="_blank" :style="{'background-image': 'url(' + getHref(item2['logo']) + ')'}"></a>
                      </div>
                      <div class="lqsblog-list-content">
                        <div class="lqsblog-list-body">
                          <a :href="item2.href" target="_blank" class="text-sm text-secondary h-2x">{{ item2.title }}</a>
                          <div class="d-none d-md-block text-xs text-muted mt-1"><div class="h-1x">{{ item2.description }}</div></div>
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
import { getThumbNoPic } from '@/utils/url'
export default {
  async fetch ({ store }) {
    store.commit('SET_ACTIVE_NAV', 'links')
    await store.dispatch('links/GET_DATA')
  },
  computed: {
    ...mapState({
      metaInfo: state => state.links.metaInfo,
      datalist: state => state.links.data
    })
  },
  methods: {
    getHref (url) {
      return getThumbNoPic(url)
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
