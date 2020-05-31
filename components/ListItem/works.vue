<template>
    <div>
        <template v-for="item in list">

            <div v-if="item.thumb.length === 4" :key="item.id" class="lqsblog-list">
                <div class="lqsblog-list-content py-lg-1">
                    <div class="lqsblog-list-body">
                        <div class="text-lg h-2x">
                            <nuxt-link class="lqsblog-list-title" :to="`/works/detail/${item.id}`">
                            {{ item.title }}
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="lqsblog-list-footer d-flex">
                        <div class="text-xs text-muted">
                            <span class="d-inline-block">{{ item.addtime }}</span>
                        </div>
                        <div class="ml-auto text-xs text-muted"></div>
                    </div>

                    <div class="lqsblog-list-images row row-sm mt-3">
                        <div v-for="(thumb, index) in item.thumb" :key="index" class="col-3">
                        <div class="lqsblog-media">
                            <nuxt-link class="lqsblog-media-content" :to="`/works/detail/${item.id}`" :style="{'background-image': 'url(' + getHref(thumb) + ')'}"></nuxt-link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="item.thumb.length < 1" :key="item.id" class="lqsblog-list">
                <div class="lqsblog-list-content py-lg-2">
                    <div class="lqsblog-list-body">
                    <div class="text-lg h-2x">
                        <nuxt-link class="lqsblog-list-title" :to="`/works/detail/${item.id}`">
                            {{ item.title }}
                        </nuxt-link>
                    </div>
                    <div class="d-none d-md-block text-sm text-muted mt-3">
                        <div class="h-3x">{{ item.description }}</div>
                    </div>
                    </div>
                    <div class="lqsblog-list-footer d-flex">
                        <div class="text-xs text-muted">
                            <span class="d-inline-block"> {{ item.addtime }}</span>
                        </div>
                        <div class="ml-auto text-xs text-muted "></div>
                    </div>
                </div>
            </div>

            <div v-else :key="item.id" class="lqsblog-list">
                <div class="lqsblog-list-content py-lg-2">

                    <div class="lqsblog-list-body">
                    <div class="text-lg h-2x">
                        <nuxt-link class="lqsblog-list-title" :to="`/works/detail/${item.id}`">
                            {{ item.title }}
                        </nuxt-link>
                    </div>
                    <div class="d-none d-md-block text-sm text-muted mt-3">
                        <div class="h-3x">{{ item.description }}</div>
                    </div>
                    </div>

                    <div class="lqsblog-list-footer d-flex">
                        <div class="text-xs text-muted">
                            <span class="d-inline-block">{{ item.addtime }}</span>
                        </div>
                        <div class="ml-auto text-xs text-muted "></div>
                    </div>

                </div>

                <div class="lqsblog-list-img col-3">
                <div class="lqsblog-media shadow">
                    <nuxt-link class="lqsblog-media-content" :to="`/works/detail/${item.id}`" :style="{'background-image': 'url(' + getHref(item.thumb[0]) + ')'}"></nuxt-link>
                </div>
                </div>

            </div>

        </template>
    </div>
</template>
<script>
import { getThumbNoPic } from '@/utils/url'
export default {
  name: 'ListItemWorks',
  props: {
    // 列表
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getHref (url) {
      return getThumbNoPic(url)
    }
  }
}
</script>
