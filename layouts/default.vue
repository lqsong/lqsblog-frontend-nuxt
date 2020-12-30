<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-12 col-lg-9">
            <nav class="navbar navbar-expand-lg navbar-light">
              <nuxt-link class="navbar-brand" to="/">
                <img class="lqsblog-logo" src="~assets/images/logo.png" alt="lqsblog">
              </nuxt-link>

              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav mx-auto ">
                  <li class="nav-item" :class="{active: activeNav === 'home' }">
                    <nuxt-link class="nav-link" to="/">首页</nuxt-link>
                  </li>
                  <li class="nav-item" :class="{active: activeNav === 'about' }">
                    <nuxt-link class="nav-link" to="/about">关于</nuxt-link>
                  </li>
                  <li class="nav-item" :class="{active: activeNav === 'article' }">
                    <nuxt-link class="nav-link " to="/article">随笔</nuxt-link>
                  </li>
                  <li class="nav-item" :class="{active: activeNav === 'works' }">
                    <nuxt-link class="nav-link " to="/works">作品</nuxt-link>
                  </li>
                  <li class="nav-item" :class="{active: activeNav === 'topics' }">
                    <nuxt-link class="nav-link " to="/topics">专题</nuxt-link>
                  </li>
                  <li class="nav-item" :class="{active: activeNav === 'links' }">
                    <nuxt-link class="nav-link " to="/links">邻居</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="http://docs.liqingsong.cc" target="_blank">开源</a>
                  </li>
                </ul>
              </div>

              <div class="lqsblog-search" data-toggle="modal" data-target="#searchModal">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#lqsblog-search"></use>
                </svg>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <!-- Modal -->
    <div id="searchModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="input-group">
                    <input ref="searchFormInput" type="text" class="form-control" placeholder="请输入搜索内容" @input="searchValInput" @keyup.enter="onSubmit">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="onSubmit">搜索</button>
                        <button ref="searchFormCancel" class="btn btn-outline-secondary" type="button" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <div ref="searchTip" class="text-danger text-center small"></div>
            </div>
        </div>
      </div>
    </div>

    <nuxt />

    <footer class="footer pt-4 pt-lg-5">
      <div class="bg-white">
          <div class="container">
            <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-9">
                  <div v-if="activeNav === 'home'" class="lqsblog-friendlink text-xs bg-light rounded p-4 mt-4">
                        <div class="text-md mb-2">
                          <svg class="icon text-primary" aria-hidden="true">
                              <use xlink:href="#lqsblog-links"></use>
                          </svg>
                          友情链接
                        </div>
                        <div>
                            <a v-for="(item, index) in linksRecommend" :key="index" class="text-muted" target="_blank" :href="item.href">{{ item.title }}</a>
                        </div>
                  </div>
                  <div class="text-xs text-muted  border-top border-light py-4 mt-4">
                      © {{ siteCreationTime }}-present All Rights Reserved<span class="px-2">⋅</span>Developed by
                      <a :href="developedBy.url" target="_blank">{{ developedBy.name }}</a><span class="px-2">⋅</span>
                      <a href="https://beian.miit.gov.cn/" rel="external nofollow" target="_blank">{{ ICP }}</a>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </footer>

    <div id="lqsblog-top" onclick="topFunction()">
        <span class="icon-stack">
              <span class="iconfont">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#lqsblog-up"></use>
                </svg>
              </span>
              <span class="top-text">Top</span>
        </span>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { trim } from '@/utils/trim'
export default {
  data () {
    return {
      searchVal: ''
    }
  },
  computed: {
    ...mapGetters([
      'siteCreationTime',
      'developedBy',
      'ICP',
      'activeNav',
      'linksRecommend'
    ]),
    searchFormAction () {
      return `/search/${this.searchVal}`
    }
  },
  methods: {
    searchValInput (e) {
      this.searchVal = trim(e.target.value)
      this.$refs.searchTip.innerHTML = ''
    },
    onSubmit () {
      if (this.searchVal === '') {
        this.$refs.searchTip.innerHTML = '请输入搜索内容'
        return false
      }
      this.$router.push(this.searchFormAction)
      this.$refs.searchFormCancel.click()
      // console.log(this.searchFormAction)

      this.$refs.searchFormInput.value = ''
      this.searchVal = ''
    }
  }
}
</script>
<style>
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.navbar-toggler {
    border: none;
    padding: .25rem .25rem;
}
.navbar-toggler:focus {
    outline: none;
}
.card,
.block {
    background: #fff;
    border-radius: 0.22rem;
    margin-bottom: 1.5rem;
    border-color: #f4f5f9;
}
.card {
    box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1);
}
.card-header,
.card-footer {
    background-color: transparent;
    border-color: #f4f5f9;
    background-clip: padding-box;
    border: 0;
    padding: 1.5rem 1.25rem;
}
a {
    color: #222831;
    text-decoration: none;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
}
a:link,
a:visited {
    text-decoration: none;
}
a:hover {
    text-decoration: none;
    color: #f1404b;  /* #007bff; */
}
a.text-muted:hover {
    color: #f1404b  /* #007bff */ !important;
}

.pagination {
    padding-top: 3rem;
}

/* 重置分页 */

.lqsblog-pagination .page-item {
    margin-right: .5rem;

}
.lqsblog-pagination .page-link {
    color: #222831;
    border-radius: .25rem;
    border: 0;
    background-color: #f4f5f9;
    font-size: 0.75rem;
}
.lqsblog-pagination .page-link:hover{
    color: #f1404b;
}
.lqsblog-pagination .page-item.active .page-link,
.lqsblog-pagination .page-pre-next:hover {
    color: #FFF;
    background-color: #f1404b;
}

.border,
.border-bottom,
.border-left,
.border-right,
.border-top {
    border-color: #f4f5f9 !important;
}

.row-sm {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
}
.row-sm [class*="col-"],
.row-sm .col {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.shadow-2x {
    -webkit-box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
    -ms-box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    line-height: 1.5;
}
.h-1x {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.h-2x {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.h-3x {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
h3,
.h3 {
    font-size: 2rem;
}
.text-muted {
    color: #7a8b9a !important;
}
.text-secondary {
    color: #252c41 !important;
}
.text-primary {
    color: #f1404b  /* #007bff */ !important;
}
.text-lg {
    font-size: 1.125rem !important;
}
.text-md {
    font-size: 1rem !important;
}
.text-sm {
    font-size: 0.875rem !important;
}
.text-xs {
    font-size: 0.75rem !important;
}
.breadcrumb.lqsblog-breadcrumb {
    background-color: #FFF;
    margin-bottom: 0;
    font-size: 0.75rem !important;
}
.breadcrumb.lqsblog-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
    content: ">";
}
blockquote.lqsblog-blockquote {
    position: relative;
    padding: 0 0 0 80px;
    margin: 40px 0;
    border: 0;
}
blockquote.lqsblog-blockquote::before {
    content: "\201C";
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 80px;
    height: 60px;
    font-size: 70px;
    line-height: 60px;
    color: #BFBFBF;
    font-family: sans-serif;
    text-align: center;
    z-index: 1;
}
.w-48 {
    width: 48px !important;
    height: 48px !important;
}
.rounded, .rounded-circle {
    overflow: hidden;
}
/* 头部 */
.header {
    z-index: 10;
    -webkit-box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
    -ms-box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 0.1) !important;
    background-color: #FFF;
}
.header.fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
}
.lqsblog-search {
    cursor: pointer;
    position: absolute;
    top: 26px;
    right: 70px;
}
.lqsblog-logo {
    height: 50px;
}
/*
.navbar-nav .nav-item .nav-link {
    position: relative;
    display: block;
}
.navbar-nav .nav-item.active a:before {
    content: '';
    height: 4px;
    left: 1px;
    right: 1px;
    background-color: rgba(241, 64, 75, .33);
    position: absolute;
    top: 80%;
    -webkit-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
}
 */

/* 首页推荐 */
.lqsblog-media {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border-radius: .33rem;
}
.lqsblog-media:after {
    content: '';
    display: block;
    padding-top: 100%;
}
.lqsblog-media-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0;
    border-radius: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: rgba(120, 120, 120, 0.1);
}
.lqsblog-media-hover {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(241, 64, 75, .66) /* rgba(0, 123, 255, .66) */;
    position: absolute;
    transition: transform 0.4s cubic-bezier(0.51, 0.01, 0.18, 1.03), opacity 0.3s ease;
    opacity: 0;
}
.lqsblog-media .title {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #FFF;
}
.lqsblog-media .title span {
    opacity: 0;
    transition: transform .4s ease;
    transform: translate3d(0, 100%, 0);
}
.lqsblog-media a:hover .lqsblog-media-hover{
    opacity: 1;
}
.lqsblog-media a:hover .title span {
    opacity: 1;
    transition: transform .4s ease;
    transform: translate3d(0, 0, 0);
}

/* 列表 */
.lqsblog-list {
    position: relative;
    padding: 2rem 0;
    border-top: 1px solid rgba(135, 150, 165, 0.075);
    margin-top: -1px;
    margin-bottom: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    min-width: 0;
    word-wrap: break-word;
    background: #fff;
    border-color: #f4f5f9;
}
.lqsblog-list:first-child {
    border-top: none;
}
.lqsblog-list-content {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-pack: center;
    justify-content: center;
}
.lqsblog-list-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.lqsblog-list-title {
    display: block;
    color: inherit;
}
.lqsblog-list-footer {
    margin-top: .75rem;
}
.lqsblog-list-images .lqsblog-media {
    margin: 0;
}

.lqsblog-list-header {
    font-size: 14px;
    color: #404b69;
}
.lqsblog-list-h-title {
    position: relative;
}
.lqsblog-list-h-title:before {
    content: '';
    left: 1px;
    right: 1px;
    height: 22%;
    background-color: #f1404b;
    position: absolute;
    opacity: 0.33;
    top: 50%;
    -webkit-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
}
.lqsblog-no-data {
    text-align: center;
}
.lqsblog-no-data h1 {
    font-size: 8rem;
    padding: 0;
}
.lqsblog-no-data img {
    max-width: 100%;
}

.lqsblog-list-grid {
    padding: .75rem 0;
}
.lqsblog-list-grid .lqsblog-list-item{
    padding: .5rem 1rem;
    flex-direction: row;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    align-items: center!important;
}

.lqsblog-list-grid .lqsblog-list-content {
    padding: 0 0 0 1rem;
}

/* 详情 */
.lqsblog-detail-body {
    position: relative;
    font-size: 1rem;
    line-height: 1.8;
    color: #404b69;
}
.lqsblog-detail-body img {
    max-width: 100%;
}
.lqsblog-tag a{
    background-color: #f7f8fa;
    padding: .25rem .5rem;
    font-size: .75rem;
    margin: 0 .5rem .5rem 0;
    border-radius: .15rem;
    display: inline-block;
}

/* 底部 */
.lqsblog-friendlink a {
    position: relative;
    display: inline-block;
    margin: .25rem .5rem .25rem .25rem;
}
.lqsblog-friendlink a:before {
    content: '\2022';
    display: inline-block;
    position: relative;
    margin-right: 5px;
}

/* 返回顶部 */
#lqsblog-top {
    display: none;
    position: fixed;
    width: 48px;
    height: 48px;
    right: 25px;
    bottom: 25px;
    z-index: 10000;
    cursor: pointer;
}

#lqsblog-top .icon-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    background-color: #252c41;
    overflow: hidden;
    -webkit-transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
    -moz-transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
    transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
    border-radius: 0.2rem;
}
#lqsblog-top .icon-stack .iconfont {
    position: absolute;
    top: 6px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transition: .15s ease 50ms;
    -moz-transition: .15s ease 50ms;
    transition: .15s ease 50ms;

}
#lqsblog-top .icon-stack .top-text {
    display: inline-block;
    -webkit-transform: translateY(5px);
    -moz-transform: translateY(5px);
    transform: translateY(5px);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .05em;
    line-height: 1em;
    -webkit-transition: -webkit-transform .35s cubic-bezier(.165, .84, .44, 1);
    -moz-transition: -moz-transform .35s cubic-bezier(.165, .84, .44, 1);
    transition: transform .35s cubic-bezier(.165, .84, .44, 1);
}
#lqsblog-top .icon-stack:hover {
    background-color: #f1404b;
}
#lqsblog-top .icon-stack:hover .iconfont {
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-10px);
    -moz-transform: translateX(-50%) translateY(-10px);
    transform: translateX(-50%) translateY(-10px);
    -webkit-transition: all .45s cubic-bezier(.165, .84, .44, 1);
    -moz-transition: all .45s cubic-bezier(.165, .84, .44, 1);
    transition: all .45s cubic-bezier(.165, .84, .44, 1);
}
#lqsblog-top .icon-stack:hover .top-text {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    transform: translateY(0);
    -webkit-transition: -webkit-transform .25s cubic-bezier(.165, .84, .44, 1) 50ms;
    -moz-transition: -moz-transform .25s cubic-bezier(.165, .84, .44, 1) 50ms;
    transition: transform .25s cubic-bezier(.165, .84, .44, 1) 50ms;
}

@media (min-width: 992px) {
    .lqsblog-search {
        right: 20px;
    }
}
@media (max-width: 767px) {
    h3,
    .h3 {
        font-size: 1.5rem;
    }
    .breadcrumb.lqsblog-breadcrumb {
        display: none;
    }
    .lqsblog-logo {
        height: 35px;
    }
    .lqsblog-search {
        top: 19px;
    }
    #lqsblog-top {
        width: 30px;
        height: 30px;
    }
    #lqsblog-top .icon-stack {
        font-size: 0.5rem;
    }
}
</style>
