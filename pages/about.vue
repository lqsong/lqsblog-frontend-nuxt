<template>
  <div class="container pt-4 pt-lg-5">
    <div class="row justify-content-lg-center">
        <div class="col-12 col-lg-9 py-4 py-lg-5">

          <h1 class="h3 mb-4">About Me</h1>

          <div id="viewerAbout"></div>
          <textarea id="viewerTextAbout" v-model="content" style="display: none;"></textarea>

        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch ({ store }) {
    store.commit('SET_ACTIVE_NAV', 'about')
    await store.dispatch('about/GET_DATA')
  },
  data () {
    return {
      viewer: null
    }
  },
  computed: {
    ...mapState({
      title: state => state.about.data.title,
      keywords: state => state.about.data.keywords,
      description: state => state.about.data.description,
      content: state => state.about.data.content
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
          el: document.getElementById('viewerAbout'),
          initialValue: this.content,
          plugins: [codeSyntaxHighlight]
        })
      }
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
