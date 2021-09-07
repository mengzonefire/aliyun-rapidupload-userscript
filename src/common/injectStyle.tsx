import appCss from "@/app.css";
import { showAlert } from "./utils";
import { extCssUrl, appError, swalCssVer } from "./const";
import ajax from "./ajax";

/**
 * @description: 注入脚本样式
 */
export function injectStyle(): void {
  GM_addStyle(appCss); // 注入自定义样式
  let swalThemes: string = GM_getValue("swalThemes") || "Default"; // sweetAlert的主题(css), 默认为Default
  let defaultThemes: string = GM_getResourceText("swalCss");
  if (swalThemes === "Default") {
    if (defaultThemes) {
      GM_addStyle(defaultThemes);
    } else {
      getThemesCss(swalThemes); // 暴力猴直接粘贴脚本代码可能不会将resource中的数据下载缓存，fallback到下载css代码
    }
    return;
  }
  let ThemesCss: string = GM_getValue(`${swalCssVer}${swalThemes}`); // 下载非默认主题的css代码
  if (ThemesCss) {
    GM_addStyle(ThemesCss);
  } else {
    getThemesCss(swalThemes); // 未找到缓存, fallback到下载css代码
  }
  return;
}

/**
 * @description: 下载并注入对应主题的css样式代码, 会将css代码缓存本地
 * @param {string} swalThemes 主题包名
 */
function getThemesCss(swalThemes: string): void {
  ajax(
    {
      url: extCssUrl[swalThemes],
      method: "GET",
    },
    (data) => {
      let ThemesCss = data.responseText;
      if (ThemesCss.length < 100) {
        console.log(`${swalThemes} InvalidCss:\n${ThemesCss}`);
        showAlert(appError.SwalCssInvalid);
        return;
      } // 返回data数据长度过小, 判定为无效样式代码
      GM_setValue(`${swalCssVer}${swalThemes}`, ThemesCss); // 缓存css代码
      GM_addStyle(ThemesCss); // 注入css
    },

    (statusCode) => {
      showAlert(appError.SwalCssErrReq + `(http#${statusCode})`);
    }
  );
}
