// ==UserScript==
// @name 秒传连接提取[阿里版]
// @version 1.0.1
// @author mengzonefire
// @description 用于提取和生成阿里云盘秒传链接
// @homepage https://greasyfork.org/zh-CN/scripts/424574
// @supportURL https://github.com/mengzonefire/aliyun-rapidupload-userscript/issues
// @match *://www.aliyundrive.com/drive*
// @name:en aliyun-rapidupload-userscript
// @license MIT
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBUlEQVR4AZTTJRBUURTH4TtDwXuPdPrgbhHXiksf3CPucRNScHd3d3d3uO9bKeu7b79+fun8Q17CNHyMMUqaiPE4fEyYVjjGNKnNwQ4lpgV8lManEfwfosLHEGPU1N3ZnAv4qlT+NiQ56uPWSjKBrztUSnIaB66sY1vgxgxoMXB5NbsCB9rxcB5fN2M5/16nCFxeS6YTezpzsB1Pu/C2O7/78/99eYBYHXh+gqdHObGIK4GHgevjVIt1AgAnhvE4cGe8euoHbizgYuD2RGgx8O0RpwIPRmsmJDGqcrANd3pLo/qVr03hUlcpfSwf0/vD3JwkPdPK5/zhkOz+/f1FIDv/RcnOAEjywH/DhgADAAAAAElFTkSuQmCC
// @namespace moe.cangku.mengzonefire
// @homepageURL https://greasyfork.org/zh-CN/scripts/424574
// @contributionURL https://afdian.net/@mengzonefire
// @description:en input alink to get files or get alink for Aliyun™ WebDisk.
// @compatible firefox Violentmonkey
// @compatible firefox Tampermonkey
// @compatible chrome Violentmonkey
// @compatible chrome Tampermonkey
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant GM_getResourceText
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @resource swalCss https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css
// @require https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @require https://cdn.jsdelivr.net/npm/jquery@3.6.0
// @require https://cdn.jsdelivr.net/npm/js-base64
// @run-at document-start
// @connect aliyundrive.com
// @connect cdn.jsdelivr.net
// ==/UserScript==
