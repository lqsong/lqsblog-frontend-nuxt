<template>
  <div class="container pt-4 pt-lg-5">
    <div class="row justify-content-lg-center">
      <div class="col-12 col-lg-9">

          <div class="pb-4 pb-md-5">
              <div class="container">
                <div class="row justify-content-lg-center py-5">
                  <div class="col-12 col-lg-9">
                    <div class="lqsblog-no-data">
                            <p><img src="~assets/images/nodata.gif" alt=""></p>
                            <template v-if="error.statusCode === 404">
                                <h1>404</h1>
                                <p>抱歉，没有你要找的内容...</p>
                            </template>
                            <template v-else>
                                <h1>{{ error.statusCode || 500 }}</h1>
                                <p>{{ error.message || '应用发生错误异常...' }}</p>
                            </template>
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
export default {
  props: {
    error: {
      type: [Array, Object],
      default () {
        return {
          statusCode: 200,
          path: '/',
          message: ''
        }
      }
    }
  }
}
</script>
