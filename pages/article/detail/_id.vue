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
                    <nuxt-link class="text-muted" to="/article">随笔</nuxt-link>
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
                        <span class="d-inline-block">
                          <nuxt-link class="text-muted" :to="`/article/${category.cname}`">
                            {{ category.title }}
                          </nuxt-link>
                        </span>
                        <i class="text-primary px-2">•</i>
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

      <div v-if="interest.length > 0" class="container pt-4 pt-lg-5">
        <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">

                <div class="h5 mb-4">
                  <span class="text-xl text-primary iconfont icon-pricetags-outline pr-2">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#lqsblog-tag"></use>
                    </svg>
                  </span>您可能感兴趣的
                </div>

                <list-item-article :list="interest"></list-item-article>

            </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItemArticle from '@/components/ListItem/article'
import { isPageId } from '@/utils/validate'
export default {
  components: {
    ListItemArticle
  },
  validate ({ params }) {
    return isPageId(params.id)
  },
  async fetch ({ store, params }) {
    store.commit('SET_ACTIVE_NAV', 'article')
    await store.dispatch('article/GET_DETAIL', { id: params.id })
    await store.dispatch('article/GET_INTEREST', { ids: store.state.article.detail.interestIds })
  },
  data () {
    return {
      viewer: null
    }
  },
  computed: {
    ...mapState({
      title: state => state.article.detail.title,
      keywords: state => state.article.detail.keywords,
      description: state => state.article.detail.description,
      addtime: state => state.article.detail.addtime,
      pageview: state => state.article.detail.pageview,
      category: state => state.article.detail.category,
      tag: state => state.article.detail.tag,
      content: state => state.article.detail.content,
      interest: state => state.article.interest
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
      if (typeof toastui !== 'undefined' && this.viewer === null) {
        // eslint-disable-next-line no-undef
        const { codeSyntaxHighlight } = toastui.Editor.plugin
        // eslint-disable-next-line no-undef
        this.viewer = new toastui.Editor({
          el: document.getElementById('viewer'),
          initialValue: this.content,
          plugins: [codeSyntaxHighlight]
        })
      }
    }
  },
  head () {
    return {
      title: `${this.title} - 文章详情`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
