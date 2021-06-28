<template>
  <div>
      <header class="header">
        <div class="container">
          <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">

                <ol class="breadcrumb lqsblog-breadcrumb">
                  <li class="breadcrumb-item">
                    <nuxt-link class="text-muted" to="/">首页</nuxt-link>
                  </li>
                  <li class="breadcrumb-item">
                    <nuxt-link class="text-muted" to="/works">作品</nuxt-link>
                  </li>
                  <li class="breadcrumb-item">{{ title }}</li>
                </ol>

              </div>
          </div>
        </div>
      </header>

      <div class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

              <section class="py-4 ">
                    <h1 class="h3 font-weight-bold">{{ title }}</h1>
                    <div class="text-sm text-muted mt-4">
                        <span class="d-inline-block">{{ addtime }}</span>
                        <i class="text-primary px-2">•</i>
                        <span class="d-inline-block pr-3">阅读 {{ pageview }} 次</span>
                    </div>
              </section>
              <div id="viewer"></div>
              <div class="d-none">{{ content }}</div>
              <div class="lqsblog-detail-body">
                <div class="lqsblog-tag mt-4">
                  <nuxt-link v-for="(item, index) in tag" :key="index" :to="`/tag/${item}`" rel="tag">{{ item }}</nuxt-link>
                </div>
              </div>

            </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isPageId } from '@/utils/validate'
export default {
  validate ({ params }) {
    return isPageId(params.id)
  },
  async fetch ({ store, params }) {
    store.commit('SET_ACTIVE_NAV', 'works')
    await store.dispatch('works/GET_DETAIL', { id: params.id })
  },
  data () {
    return {
      viewer: null
    }
  },
  computed: {
    ...mapState({
      title: state => state.works.detail.title,
      keywords: state => state.works.detail.keywords,
      description: state => state.works.detail.description,
      addtime: state => state.works.detail.addtime,
      pageview: state => state.works.detail.pageview,
      tag: state => state.works.detail.tag,
      content: state => state.works.detail.content
    })
  },
  watch: {
  },
  mounted () {
    // console.log('mounted')
    this.setEditorViewer()
  },
  destroyed () {
    // console.log('destroyed')
  },
  methods: {
    // 设置 markdown 详情
    setEditorViewer () {
      if (typeof window.toastui !== 'undefined' && this.viewer === null) {
        const { codeSyntaxHighlight } = window.toastui.Editor.plugin
        const { Prism } = window // 3.0.0
        this.viewer = window.toastui.Editor.factory({ // 3.0.0
        // this.viewer = new window.toastui.Editor({ // 2.2.0
          el: document.getElementById('viewer'),
          viewer: true,
          initialValue: this.content,
          plugins: [[codeSyntaxHighlight, { highlighter: Prism }]] // 3.0.0
          // plugins: [codeSyntaxHighlight] // 2.2.0
        })
      }
    }
  },
  head () {
    return {
      title: `${this.title} - 作品详情`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
