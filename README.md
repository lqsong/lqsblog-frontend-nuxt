# lqsblog-frontend-nuxt

 它（[Github](https://github.com/lqsong/lqsblog-frontend-nuxt) 、 [Gitee](https://gitee.com/lqsong/lqsblog-frontend-nuxt)）是一个PC端、WAP端自适应展示的一个前端网站前台，它基于 [nuxtjs](https://zh.nuxtjs.org/)实现。

## 开发文档

- [DEMO](http://liqingsong.cc/)

- [lqsBlog官方文档](http://docs.liqingsong.cc/)。


## 功能

```
- 首页
  -- 最新推荐
  -- 随笔作品列表
  -- 友情链接
- 关于
- 随笔
- 作品
- 专题
- 邻居

- 百度SEO推送
- CNZZ统计
```


## 界面展示

![index](https://gitee.com/lqsong/lqsblog/raw/master/images/lqsblog-frontend-nuxt/index.png) 


## 目录结构

本项目基于nuxtjs生成，下面是整个项目的目录结构。大部分主体目录结构说明请参照[nuxtjs目录结构](https://zh.nuxtjs.org/guide/directory-structure)

```bash
├── assets                     # 资源目录
│   │── images                 # 图片目录
├── components                 # 组件目录
├── layouts                    # 布局目录
├── middleware                 # 中间件目录
├── pages                      # 页面目录
│   ├── article                # 随笔目录
│   │   ├── detail             # 随笔详情
│   │   └── _cname.vue         # 随笔（分类）列表
│   ├── search                 # 搜索列表目录
│   ├── tag                    # 标签下内容列表目录
│   ├── topics                 # 专题目录
│   │   ├── detail             # 专题详情
│   │   └── index.vue          # 专题列表
│   ├── works                  # 作品目录
│   │   ├── detail             # 作品详情
│   │   └── index.vue          # 作品列表
│   ├── about.vue              # 关于我
│   ├── index.vue              # 首页
│   └── links.vue              # 邻居
├── plugins                    # 插件目录
├── server                     # 服务器配置目录
├── static                     # 静态文件目录
├── store                      # Store 目录（server Api目录）
├── test                       # 测试
├── utils                      # 工具包
├── .babelrc                   # .babelrc配置
├── .editorconfig              # 编辑器配置
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── ava.config.cjs             # ava.config.cjs 配置
├── jsconfig.json              # vscode js配置
├── nuxt.config.js             # nuxt.config.js 文件
└── package.json               # package.json
```



## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at 127.0.0.1:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

or

$ npm run server

# generate static project
$ npm run generate
```

## 配置 nginx 反向代理

```bash
http {
    # 内部添加以下内容
    server {
        # 监听 80 端口 ，你也可以设置其他端口但是访问域名时需要加上端口访问
        listen       80;
        # 你的网址，如果是本地测试，也可以设置你本地的ip
        server_name  liqingsong.cc;
        location / {
            # 代理地址，你本地 nuxt 的访问地址
		    proxy_pass  http://127.0.0.1:3000;
            index  index.html index.htm;
            
        }  
    }
}
```

## 捐赠

如果你觉得这个项目帮助到了你，你可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](http://uploads.liqingsong.cc/20210430/f62d2436-8d92-407d-977f-35f1e4b891fc.png)  |  ![Wechat](http://uploads.liqingsong.cc/20210430/3e24efa9-8e79-4606-9bd9-8215ce1235ac.png)
