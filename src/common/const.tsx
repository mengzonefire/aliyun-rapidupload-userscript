export const updateInfoVer = "1.0.0"; // 更新信息的版本, 有些没必要提示的小更新就不加到更新提示里了
export const swalCssVer = "1.0.0"; // 由于其他主题的Css代码会缓存到本地, 故更新主题包版本(url)时, 需要同时更新该字串以刷新缓存
export const donateVer = "1.0.0"; // 用于检测可关闭的赞助提示的版本号
export const feedbackVer = "1.0.0"; // 用于检测可关闭的反馈提示的版本号
export const locUrl: string = location.href;
export const bdlinkPattern = /[\?#]alink=([\da-zA-Z+/=]+)/; // b64可能出现的字符: 大小写字母a-zA-Z, 数字0-9, +, /, = (=用于末尾补位)
export const TAG = "[秒传链接提取 by mengzonefire]";
export const homePage = "https://greasyfork.org/zh-CN/scripts/432065";
export const donatePage = "https://afdian.net/@mengzonefire";
export const ajaxError = 514; // 自定义ajax请求失败时的错误码(不能与http statusCode冲突)
export const extCssUrl = {
  Default:
    "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
  Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
  "WordPress Admin":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
  "Material UI":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
  Bulma:
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
  "Bootstrap 4":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css",
}; // 各主题包对应的url
export const appError = {
  missDepend: "外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS",
  SwalCssInvalid: `样式包加载错误, 请前往脚本页反馈F12控制台截图\n${homePage}`,
  SwalCssErrReq: "样式包加载失败",
}; // 主程序异常
export interface FileInfo {
  path: string;
  size?: number;
  hash?: string;
  errno?: number;
} // 自定义文件信息数据结构
export interface ListInfo {
  file_id: string;
  size?: number;
  hash?: string;
} // 自定义文件信息数据结构2
export const doc = {
  linkTypeDoc: "https://shimo.im/docs/WGWcxYDrqChxQyJ3/",
}; // 各文档url
export const linkStyle =
  'class="mzf_link" rel="noopener noreferrer" target="_blank"';
export const btnStyle =
  'class="mzf_btn" rel="noopener noreferrer" target="_blank"';
export const htmlDonate = `<p id="mzf_donate" class="mzf_text">若喜欢该脚本, 可前往 <a href="${donatePage}" ${linkStyle}>赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>`;
export const htmlFeedback = `<p id="mzf_feedback" class="mzf_text">若有任何疑问, 可前往 <a href="${homePage}" ${linkStyle}>脚本主页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>`;
