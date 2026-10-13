[![Build Status](https://github.com/lsk-boy-f/anti-redirect/actions/workflows/build.yml/badge.svg)](https://github.com/lsk-boy-f/anti-redirect/actions/workflows/build.yml)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

### GM 脚本，反重定向

去除各搜索引擎/常用网站的重定向

本仓库由 [lsk-boy-f](https://github.com/lsk-boy-f) 维护，基于 [Axetroy 的原项目](https://github.com/axetroy/anti-redirect)。

> 注意事项：
>
> 重定向一般有两种目的
>
> 1. 追踪用户打开了哪些 URL
> 2. 在用户跳转到站外之前进行确认地址，防止打开不明的页面

### 反馈地址

> 反馈最好能带上出问题的网页地址

- https://github.com/lsk-boy-f/anti-redirect/issues/new/choose

[点击从 GitHub 安装](https://github.com/lsk-boy-f/anti-redirect/raw/gh-pages/anti-redirect.user.js)

[点击从 CDN 安装](https://cdn.jsdelivr.net/gh/lsk-boy-f/anti-redirect@gh-pages/anti-redirect.user.js)

### 工作原理

1.  根据 URL 上暴露出来的跳转链接，正则匹配提取真实的地址，例如知乎，Google
2.  如果 A 标签的内容为真实的地址，则替换，例如百度贴吧
3.  逐一发送请求，获取真实的地址，例如百度搜索
4.  根据请求特殊页面，这个特殊页面没有重定向地址，然后覆盖当前页，例如百度搜索，搜狗搜索
5.  覆盖原本的链接点击事件，比如 qq 邮箱

### 更新日志

[更新日志](https://github.com/lsk-boy-f/anti-redirect/blob/master/CHANGELOG.md)

### 支持的站点

- [x] 知乎
- [x] 知乎专栏
- [x] 知乎日报
- [x] Google 搜索
- [x] Google 文档
- [x] Google Play
- [x] Google Gmail
- [x] Google Youtube
- [x] Steam
- [x] 360 搜索
- [x] 新浪微博
- [x] Twitter
- [x] 搜狗搜索
- [x] 百度搜索
- [x] 百度视频
- [x] 百度学术
- [x] 百度贴吧
- [x] 掘金
- [x] QQ 邮箱
- [x] Mozilla
- [x] 简书
- [x] 豆瓣
- [x] Pocket
- [x] DogeDoge
- [x] 秘迹
- [x] CSDN
- [x] 开源中国
- [x] 印象笔记
- [x] 标志情报局
- [x] 爱发电
- [x] 51 CTO
- [x] InfoQ
- [x] Gitee
- [x] 少数派

<details><summary>更多</summary>

- [x] 51.ruyo.net

</details>

### 我想支持更多的站点

点击这个[链接](https://github.com/lsk-boy-f/anti-redirect/issues/new)，提交 issues，说出你想要支持的站点

### 贡献代码

需要 Node.js 22 或更高版本，并使用 pnpm 11 安装依赖、编译 TypeScript。

```bash
git clone https://github.com/lsk-boy-f/anti-redirect.git

cd ./anti-redirect

corepack pnpm install --frozen-lockfile
corepack pnpm run watch
```

发布构建使用 `corepack pnpm run build`；带内联 Source Map 的调试构建使用 `corepack pnpm run build:debug`。

### 开源许可

The [Anti 996 License](https://github.com/lsk-boy-f/anti-redirect/blob/master/LICENSE)

请仔细阅读开源许可。

简而言之： 如果你正在 996，或者你的公司/单位正在 996 ，那么请不要安装这个脚本！
