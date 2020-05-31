<template>
  <div>
      <div class="lqsblog-list-header bg-light py-4 py-lg-5">
        <div class="container">
          <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">
                  <h1 class="h3">
                    <span class="lqsblog-list-h-title">{{ title }}</span>
                  </h1>
              </div>
          </div>
        </div>
      </div>

      <div class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

                <list-item :list="dataList"></list-item>

            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from '@/components/ListItem'
export default {
  components: {
    ListItem
  },
  validate ({ params, query }) {
    return params.cname
  },
  async fetch ({ store, params, query }) {
    store.commit('SET_ACTIVE_NAV', 'topics')
    await store.dispatch('topics/GET_DETAIL', { cname: params.cname })
  },
  computed: {
    ...mapState({
      title: state => state.topics.detail.title,
      keywords: state => state.topics.detail.keywords,
      description: state => state.topics.detail.description,
      addtime: state => state.topics.detail.addtime,
      pageview: state => state.topics.detail.pageview,
      dataList: state => state.topics.detail.list
    })
  },
  head () {
    return {
      title: `${this.title} - 专题`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
