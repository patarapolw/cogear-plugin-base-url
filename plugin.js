const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const BASE_URL = cogear.config.baseUrl  || "/";

module.exports = {
  apply() {
    cogear.on("webpack.config", (webpackConfig) => {
      cogear.baseUrl = webpackConfig.mode === "production" ? BASE_URL : "/";
    }),
    cogear.on("build.page.writeAfter", ([page, html]) => {
      html = html.replace(/(<link rel="stylesheet" href="|<script src=")\//g, `$1${BASE_URL}`);
      page.writePath = path.join(cogear.options.output, page.path);
      fs.writeFileSync(page.writePath, html);
    })
  }
}