const path = require("path");
const fs = require("fs");

module.exports = {
  apply() {
    cogear.on("build.page.writeAfter", ([page, html]) => {
      let BASE_URL = cogear.config.baseUrl  || "/";
      html = html.replace(/(<link rel="stylesheet" href="|<script src=")\//g, `$1${BASE_URL}`);
      page.writePath = path.join(cogear.options.output, page.path);
      fs.writeFileSync(page.writePath, html);
    })
  }
}