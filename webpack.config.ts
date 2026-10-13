/**
 * Created by axetroy on 16-9-15.
 */

import { format } from "date-fns";
import * as path from "path";
import * as webpack from "webpack";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const pkg = require("./package.json");
const isProduction = process.env.NODE_ENV === "production";
const scriptName = isProduction ? pkg.name : `${pkg.name} (debug)`;
const repositoryUrl = pkg.homepage;
const updateMetadata = isProduction
  ? `// @downloadURL       ${repositoryUrl}/raw/gh-pages/anti-redirect.user.js
// @updateURL         ${repositoryUrl}/raw/gh-pages/anti-redirect.user.js
`
  : "";

// webpack.config.js
const webpackConfig: webpack.Configuration = {
  entry: {
    "anti-redirect": path.join(__dirname, "index.ts"),
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: isProduction ? "[name].user.js" : "[name].debug.user.js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  // 两个版本都保留可读代码，并由 NODE_ENV 控制运行时配置；只有调试版内嵌 Source Map。
  mode: "none",
  plugins: [
    new webpack.DefinePlugin(
      (() => {
        const result = { "process.env.NODE_ENV": '"development"' };
        for (const key in process.env) {
          if (Object.prototype.hasOwnProperty.call(process.env, key)) {
            result[`process.env.${key}`] = JSON.stringify(process.env[key]);
          }
        }
        return result;
      })()
    ),
    new webpack.BannerPlugin({
      banner: `// ==UserScript==
// @name              ${scriptName}
// @author            ${pkg.author}
// @description       ${pkg.description}
// @version           ${pkg.version}
// @update            ${format(new Date(), "yyyy-MM-dd HH:mm:ss")}
// @grant             GM_xmlhttpRequest
// @match             *://www.baidu.com/*
// @match             *://tieba.baidu.com/*
// @match             *://v.baidu.com/*
// @match             *://xueshu.baidu.com/*
// @include           *://www.google*
// @match             *://www.google.com/*
// @match             *://docs.google.com/*
// @match             *://mail.google.com/*
// @match             *://play.google.com/*
// @match             *://www.youtube.com/*
// @match             *://encrypted.google.com/*
// @match             *://www.so.com/*
// @match             *://www.zhihu.com/*
// @match             *://daily.zhihu.com/*
// @match             *://zhuanlan.zhihu.com/*
// @match             *://weibo.com/*
// @match             *://twitter.com/*
// @match             *://www.sogou.com/*
// @match             *://juejin.im/*
// @match             *://juejin.cn/*
// @match             *://mail.qq.com/*
// @match             *://addons.mozilla.org/*
// @match             *://www.jianshu.com/*
// @match             *://www.douban.com/*
// @match             *://getpocket.com/*
// @match             *://www.dogedoge.com/*
// @match             *://51.ruyo.net/*
// @match             *://steamcommunity.com/*
// @match             *://mijisou.com/*
// @match             *://blog.csdn.net/*
// @match             *://*.blog.csdn.net/*
// @match             *://*.oschina.net/*
// @match             *://app.yinxiang.com/*
// @match             *://www.logonews.cn/*
// @match             *://afdian.net/*
// @match             *://blog.51cto.com/*
// @match             *://xie.infoq.cn/*
// @match             *://gitee.com/*
// @match             *://sspai.com/*
// @connect           www.baidu.com
// @connect           *
// @compatible        chrome  完美运行
// @compatible        firefox  完美运行
// @supportURL        ${repositoryUrl}/issues/new/choose
// @homepage          ${repositoryUrl}
// @run-at            document-start
${updateMetadata}// @namespace         ${repositoryUrl}
// @license           Anti 996 License; ${repositoryUrl}/blob/master/LICENSE
// ==/UserScript==

// 源码: ${repositoryUrl}

`,
      entryOnly: true,
      raw: true,
      // 在资源处理结束后再写入元信息，确保其位于用户脚本文件开头。
      stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
    }),
  ],
  devtool: isProduction ? false : "inline-source-map",
};

module.exports = webpackConfig;
