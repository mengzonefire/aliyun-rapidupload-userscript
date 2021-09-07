// ==UserScript==
// @name 秒传连接提取[阿里版]
// @version 1.0.2
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

(() => {
    var __webpack_modules__ = {
        555: module => {
            module.exports = '/*按钮样式*/\r\n.mzf_btn {\r\n  text-align: center;\r\n  font-size: 0.85em;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  margin: 0 5px;\r\n  padding: 10px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n/*超链接样式*/\r\n.mzf_link {\r\n  font-family: inherit;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n}\r\n\r\n/*行样式*/\r\n.mzf_text {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  color: #545454;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n';
        },
        184: module => {
            module.exports = '<div class="panel-body" style="height: 180px; overflow-y:scroll">\r\n        <div style="border: 1px  #000000; width: 100%; margin: 0 auto;"><span>\r\n\r\n                        <p>若喜欢该脚本可前往 <a href="https://afdian.net/@mengzonefire" class="mzf_link"\r\n                                        rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者</p>\r\n\r\n                        <p>若出现任何问题请前往 <a href="https://greasyfork.org/zh-CN/scripts/432065" class="mzf_link"\r\n                                        rel="noopener noreferrer" target="_blank">脚本主页</a> 反馈</p>\r\n\r\n                        <p>脚本源码托管在 <img src="https://github.githubassets.com/favicons/favicon.png" width=\'16\'><a\r\n                                        href="https://github.com/mengzonefire/aliyun-rapidupload-userscript" class="mzf_link"\r\n                                        rel="noopener noreferrer" target="_blank">Github</a>, 若喜欢可以给个Star</p>\r\n\r\n                        <p><br></p>\r\n\r\n                        <p>1.0.0 更新内容(21.9.8):</p>\r\n\r\n                        <p>1. 转存文件不支持输入路径, 默认转存在当前目录</p>\r\n\r\n                        <p>2. 自带重命名功能支持修改文件后缀名</p>\r\n\r\n                </span></div>\r\n</div>';
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var updateInfoVer = "1.0.0";
        var swalCssVer = "1.0.0";
        var donateVer = "1.0.0";
        var feedbackVer = "1.0.0";
        var locUrl = location.href;
        var bdlinkPattern = /[\?#]alink=([\da-zA-Z+/=]+)/;
        var TAG = "[秒传链接提取 by mengzonefire]";
        var homePage = "https://greasyfork.org/zh-CN/scripts/432065";
        var donatePage = "https://afdian.net/@mengzonefire";
        var ajaxError = 514;
        var extCssUrl = {
            Default: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
            "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
            "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
            Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
            "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
        };
        var appError = {
            missDepend: "外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS",
            SwalCssInvalid: "样式包加载错误, 请前往脚本页反馈F12控制台截图\n" + homePage,
            SwalCssErrReq: "样式包加载失败"
        };
        var doc = {
            linkTypeDoc: "https://shimo.im/docs/WGWcxYDrqChxQyJ3/"
        };
        var linkStyle = 'class="mzf_link" rel="noopener noreferrer" target="_blank"';
        var btnStyle = 'class="mzf_btn" rel="noopener noreferrer" target="_blank"';
        var htmlDonate = '<p id="mzf_donate" class="mzf_text">若喜欢该脚本, 可前往 <a href="' + donatePage + '" ' + linkStyle + '>赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>';
        var htmlFeedback = '<p id="mzf_feedback" class="mzf_text">若有任何疑问, 可前往 <a href="' + homePage + '" ' + linkStyle + '>脚本主页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>';
        function initQueryLink() {
            var bdlinkB64 = locUrl.match(bdlinkPattern);
            return bdlinkB64 ? bdlinkB64[1].fromBase64() : "";
        }
        function aliyunParser() {}
        aliyunParser.parse = function generalDuCodeParse(szUrl) {
            var r;
            szUrl = szUrl.trim();
            if (szUrl.indexOf("aliyunpan://") === 0) {
                r = aliyunParser.parseAliyun_v1(szUrl);
                r.ver = "aliyun";
            } else if (szUrl.indexOf("115://") === 0) {
                r = aliyunParser.parseAliyun_v2(szUrl);
                r.ver = "115";
            }
            return r;
        };
        aliyunParser.parseAliyun_v1 = function(szUrl) {
            return szUrl.split("\n").map((function(z) {
                return z.trim().match(/aliyunpan:\/\/([\s\S]+)\|([\dA-F]{40})\|([\d]{1,20})/);
            })).filter((function(z) {
                return z;
            })).map((function(info) {
                return {
                    hash: info[2],
                    size: Number(info[3]),
                    path: info[1]
                };
            }));
        };
        aliyunParser.parseAliyun_v2 = function(szUrl) {
            return szUrl.split("\n").map((function(z) {
                return z.trim().match(/115:\/\/([\s\S]+)\|([\d]{1,20})\|([\dA-F]{40})/);
            })).filter((function(z) {
                return z;
            })).map((function(info) {
                return {
                    hash: info[3],
                    size: Number(info[2]),
                    path: info[1]
                };
            }));
        };
        var updateInfo = __webpack_require__(184);
        var updateInfo_default = __webpack_require__.n(updateInfo);
        var SwalConfig = {
            inputView: {
                title: "请输入秒传",
                input: "textarea",
                showCancelButton: true,
                inputPlaceholder: "[支持aliyun/115][支持批量(换行分隔)]\n[输入set进入设置页]",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function(value) {
                    if (!value) {
                        return "链接不能为空";
                    }
                    if (value === "set") {
                        return;
                    }
                    if (!aliyunParser.parse(value).length) {
                        return '<p>未识别到正确的链接 <a href="' + doc.linkTypeDoc + '" ' + linkStyle + ">查看支持格式</a></p>";
                    }
                }
            },
            renameView: {
                title: "请输入秒传",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            },
            processView: {
                showCloseButton: true,
                showConfirmButton: false,
                allowOutsideClick: false
            },
            finishView: {
                showCloseButton: true,
                allowOutsideClick: false
            },
            updateInfo: {
                title: "秒传链接提取[阿里版] 更新内容",
                showCloseButton: true,
                allowOutsideClick: false,
                confirmButtonText: "知道了",
                html: updateInfo_default()
            },
            settingView: {
                title: "秒传链接提取 设置页",
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                allowOutsideClick: false,
                input: "select",
                inputValue: GM_getValue("swalThemes") || "Default",
                inputOptions: {
                    Default: "Default 白色主题(默认)",
                    Bulma: "Bulma 白色简约",
                    "Bootstrap 4": "Bootstrap4 白色简约",
                    "Material UI": "MaterialUI 白色主题",
                    Dark: "Dark 黑色主题",
                    "WordPress Admin": "WordPressAdmin 灰色主题"
                }
            },
            settingWarning: {
                title: "设置成功 刷新页面生效",
                showCloseButton: true,
                allowOutsideClick: false,
                confirmButtonText: "知道了"
            }
        };
        var __assign = undefined && undefined.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function ajax(config, callback, failback) {
            GM_xmlhttpRequest(__assign(__assign({}, config), {
                onload: function(r) {
                    if (Math.floor(r.status / 100) === 2) callback(r); else failback(r.status);
                },
                onerror: function() {
                    failback(ajaxError);
                }
            }));
        }
        function showAlert(text) {
            alert(TAG + ":\n" + text);
        }
        function parsefileInfo(fileInfoList) {
            var bdcode = "";
            var failedInfo = "";
            var failedCount = 0;
            var successList = [];
            fileInfoList.forEach((function(item) {
                if (item.errno) {
                    failedCount++;
                    failedInfo += "<p>文件：" + item.path + "</p><p>失败原因：" + aliyunErrno(item.errno) + "(#" + item.errno + ")</p>";
                } else {
                    bdcode += "aliyunpan://" + item.path + "|" + item.hash + "|" + item.size + "\n";
                    successList.push(item);
                }
            }));
            if (failedInfo) failedInfo = "<p>失败文件列表:</p>" + failedInfo;
            bdcode = bdcode.trim();
            return {
                htmlInfo: failedInfo,
                failedCount,
                bdcode,
                successList
            };
        }
        function getAccessToken(onFinish) {
            ajax({
                url: tokenUrl,
                method: "POST",
                responseType: "json",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                data: JSON.stringify({
                    refresh_token: JSON.parse(localStorage.getItem("token")).refresh_token
                })
            }, (function(data) {
                data = data.response;
                if (data.access_token) setToken(data.access_token); else {
                    showAlert("获取token失败, 请尝试刷新页面, 或重新登录");
                    return;
                }
                var drive_id = localStorage.getItem("token");
                if (drive_id) setDriverId(JSON.parse(drive_id).default_drive_id); else {
                    showAlert("获取driveId失败, 请尝试刷新页面, 或重新登录");
                    return;
                }
                onFinish();
            }), (function(statusCode) {
                showAlert("获取token失败(" + statusCode + "), 请尝试刷新页面, 或重新登录");
            }));
        }
        function addXMLRequestCallback(callback) {
            (function(open) {
                XMLHttpRequest.prototype.open = function() {
                    this.addEventListener("readystatechange", (function() {
                        if (this.readyState === 4) {
                            callback(this);
                        }
                    }), false);
                    open.apply(this, arguments);
                };
            })(XMLHttpRequest.prototype.open);
        }
        var pathInfoList = {};
        var searchInfoList = {};
        function XHRcallback(xhr) {
            var action = "";
            if (xhr.responseURL == "https://api.aliyundrive.com/adrive/v3/file/list") {
                action = "list";
                pathInfoList = {};
            } else if (xhr.responseURL == "https://api.aliyundrive.com/adrive/v3/file/search") {
                action = "search";
                searchInfoList = {};
            } else {
                return;
            }
            JSON.parse(xhr.response).items.forEach((function(item) {
                var data;
                if (item.type == "folder") {
                    data = {
                        file_id: item.file_id
                    };
                } else {
                    data = {
                        file_id: item.file_id,
                        size: item.size,
                        hash: item.content_hash
                    };
                }
                if (action == "list") pathInfoList[item.name] = data; else if (action == "search") searchInfoList[item.name] = data;
            }));
        }
        var __spreadArray = undefined && undefined.__spreadArray || function(to, from) {
            for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
            return to;
        };
        var Swalbase = function() {
            function Swalbase(rapiduploadTask, generatebdlinkTask) {
                this.rapiduploadTask = rapiduploadTask;
                this.generatebdlinkTask = generatebdlinkTask;
            }
            Swalbase.prototype.mergeArg = function() {
                var inputArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputArgs[_i] = arguments[_i];
                }
                var output = {};
                $.extend.apply($, __spreadArray([ output, this.swalArgs ], inputArgs));
                return output;
            };
            Swalbase.prototype.inputView = function(swalArg) {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.inputView, swalArg)).then((function(result) {
                    if (result.isConfirmed) {
                        if (result.value === "set") _this.settingView(); else {
                            _this.rapiduploadTask.fileInfoList = aliyunParser.parse(result.value);
                            _this.processView();
                        }
                    }
                }));
            };
            Swalbase.prototype.processView = function() {
                var _this = this;
                var swalArg = {
                    title: "文件提取中",
                    html: "正在转存第 <file_num>0</file_num> 个",
                    willOpen: function() {
                        Swal.showLoading();
                        _this.saveFileWork();
                    }
                };
                Swal.fire(this.mergeArg(SwalConfig.processView, swalArg));
            };
            Swalbase.prototype.finishView = function(isGen) {
                var action = isGen ? "生成" : "转存";
                var fileInfoList = isGen ? this.generatebdlinkTask.fileInfoList : this.rapiduploadTask.fileInfoList;
                var parseResult = parsefileInfo(fileInfoList);
                if (isGen) this.rapiduploadTask.fileInfoList = parseResult.successList;
                var html = parseResult.htmlInfo;
                var htmlFooter = "";
                if (!GM_getValue(donateVer + "_kill_donate")) htmlFooter += htmlDonate;
                if (!GM_getValue(feedbackVer + "_kill_donate")) htmlFooter += htmlFeedback;
                if (htmlFooter) htmlFooter = "<p><br></p>" + htmlFooter;
                var swalArg = {
                    title: action + "完毕 共" + fileInfoList.length + "个, 失败" + parseResult.failedCount + "个!",
                    confirmButtonText: parseResult.failedCount !== fileInfoList.length && isGen ? "复制秒传代码" : "确认",
                    html: html + htmlFooter
                };
                Swal.fire(this.mergeArg(SwalConfig.finishView, swalArg)).then((function(result) {
                    if (result.isConfirmed) {
                        if (isGen) {
                            GM_setClipboard(parseResult.bdcode);
                        } else {
                            var alink = location.href.match(bdlinkPattern);
                            if (alink) location.href = location.href.replace(alink[0], ""); else location.reload();
                        }
                    }
                }));
            };
            Swalbase.prototype.renameView = function() {
                var _this = this;
                var infoList = {}, selectFile, selectNode = document.querySelectorAll('div[data-is-selected="true"]');
                if (selectNode.length === 1) selectFile = selectNode[0].innerText.split("\n\n")[0]; else {
                    showAlert("未选中文件/选中了多个文件");
                    return;
                }
                infoList = location.href.indexOf("/drive/search/") !== -1 ? searchInfoList : pathInfoList;
                Swal.fire(this.mergeArg(SwalConfig.renameView, {
                    inputValue: selectFile,
                    inputValidator: function(value) {
                        if (value === selectFile) return; else if (infoList[value]) return "路径下存在同名文件/文件夹";
                    }
                })).then((function(result) {
                    if (result.isConfirmed) {
                        if (result.value === selectFile) return; else _this.renameWork(infoList[selectFile].file_id, result.value);
                    }
                }));
            };
            Swalbase.prototype.settingView = function() {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.settingView)).then((function(result) {
                    if (result.isConfirmed) {
                        GM_setValue("swalThemes", result.value);
                        Swal.close();
                        Swal.fire(_this.mergeArg(SwalConfig.settingWarning));
                    }
                }));
            };
            Swalbase.prototype.updateInfo = function(onConfirm) {
                Swal.fire(this.mergeArg(SwalConfig.updateInfo)).then((function(result) {
                    if (result.isConfirmed) onConfirm();
                }));
            };
            Swalbase.prototype.saveFileWork = function() {
                var _this = this;
                this.rapiduploadTask.onFinish = function() {
                    _this.finishView(false);
                };
                this.rapiduploadTask.onProcess = function(i, fileInfoList) {
                    Swal.getHtmlContainer().querySelector("file_num").textContent = i + 1 + " / " + fileInfoList.length;
                };
                this.rapiduploadTask.start();
            };
            Swalbase.prototype.genFileWork = function() {
                var _this = this;
                var infoList = {}, selectList = [], selectNode = document.querySelectorAll('div[data-is-selected="true"]');
                if (selectNode.length) selectNode.forEach((function(item) {
                    selectList.push(item.innerText.split("\n\n")[0]);
                })); else {
                    showAlert("未选中文件");
                    return;
                }
                infoList = location.href.indexOf("/drive/search/") !== -1 ? searchInfoList : pathInfoList;
                selectList.forEach((function(item) {
                    var fileInfo = infoList[item].hash ? {
                        path: item,
                        hash: infoList[item].hash,
                        size: infoList[item].size
                    } : {
                        path: item,
                        errno: 900
                    };
                    _this.generatebdlinkTask.fileInfoList.push(fileInfo);
                }));
                this.finishView(true);
            };
            Swalbase.prototype.renameWork = function(file_id, name) {
                ajax({
                    url: renameUrl,
                    method: "POST",
                    responseType: "json",
                    headers: {
                        "Content-type": "application/json;charset=utf-8",
                        Authorization: access_token
                    },
                    data: JSON.stringify({
                        drive_id: driver_id,
                        file_id,
                        name,
                        check_name_mode: "refuse"
                    })
                }, (function() {
                    location.reload();
                }), (function(statusCode) {
                    showAlert("重命名失败(" + statusCode + ")");
                }));
            };
            return Swalbase;
        }();
        const SwalBase = Swalbase;
        var GeneratebdlinkTask = function() {
            function GeneratebdlinkTask() {}
            GeneratebdlinkTask.prototype.reset = function() {
                this.fileInfoList = [];
            };
            return GeneratebdlinkTask;
        }();
        const common_GeneratebdlinkTask = GeneratebdlinkTask;
        var RapiduploadTask = function() {
            function RapiduploadTask() {}
            RapiduploadTask.prototype.reset = function() {
                this.fileInfoList = [];
                this.onFinish = function() {};
                this.onProcess = function() {};
            };
            RapiduploadTask.prototype.start = function() {
                this.interval = this.fileInfoList.length > 1 ? 2e3 : 1e3;
                var nowPath = location.href.match(/drive\/folder\/([\da-z]+)/);
                this.savePath = nowPath ? nowPath[1] : "root";
                this.saveFile(0);
            };
            RapiduploadTask.prototype.saveFile = function(i) {
                var _this = this;
                if (i >= this.fileInfoList.length) {
                    this.onFinish(this.fileInfoList);
                    return;
                }
                this.onProcess(i, this.fileInfoList);
                var file = this.fileInfoList[i];
                ajax({
                    url: creatUrl,
                    method: "POST",
                    responseType: "json",
                    headers: {
                        "Content-type": "application/json;charset=utf-8",
                        Authorization: access_token
                    },
                    data: JSON.stringify({
                        drive_id: driver_id,
                        parent_file_id: this.savePath,
                        size: file.size,
                        name: file.path,
                        content_hash: file.hash,
                        type: "file",
                        check_name_mode: "refuse",
                        content_hash_name: "sha1"
                    })
                }, (function(data) {
                    data = data.response;
                    if (data.exist) file.errno = -8; else if (!data.rapid_upload) file.errno = 404;
                    setTimeout((function() {
                        _this.saveFile(i + 1);
                    }), _this.interval);
                }), (function(statusCode) {
                    file.errno = statusCode;
                    _this.saveFile(i + 1);
                }));
            };
            return RapiduploadTask;
        }();
        const common_RapiduploadTask = RapiduploadTask;
        var tokenUrl = "https://websv.aliyundrive.com/token/refresh";
        var renameUrl = "https://api.aliyundrive.com/v3/file/update";
        var creatUrl = "https://api.aliyundrive.com/v2/file/create";
        var htmlTag = "div.breadcrumb-wrap--2iqqe";
        var const_btnStyle = 'class="button-wrapper--1UkG6" data-type="primary" style="margin-left: 20px;"';
        var renameBtn = '<div id="mzf_rename" ' + const_btnStyle + ">重命名</div>";
        var bdlinkBtn = '<div id="mzf_bdlink" ' + const_btnStyle + ">秒传链接</div>";
        var genBtn = '<div id="mzf_gen" ' + const_btnStyle + ">生成秒传</div>";
        var access_token = "";
        var driver_id = "";
        function setToken(mytoken) {
            access_token = mytoken;
        }
        function setDriverId(myDriverId) {
            driver_id = myDriverId;
        }
        var swalInstance = new SwalBase(new common_RapiduploadTask, new common_GeneratebdlinkTask);
        function aliyunErrno(errno) {
            switch (errno) {
              case -8:
                return "路径下存在同名文件/文件夹";

              case 404:
                return "秒传未生效";

              case 900:
                return "文件夹不支持生成秒传";

              default:
                return "未知错误";
            }
        }
        function loaderAliyun() {
            var bdlink = initQueryLink();
            if (bdlink) swalInstance.inputView({
                inputValue: bdlink
            }); else if (!GM_getValue(updateInfoVer + "_no_first")) swalInstance.updateInfo((function() {
                GM_setValue(updateInfoVer + "_no_first", true);
            }));
            console.info("%s DOM方式安装，若失效请报告。", TAG);
            addBtn();
            $(document).on("click", "#mzf_gen", (function() {
                swalInstance.generatebdlinkTask.reset();
                swalInstance.genFileWork();
            }));
            $(document).on("click", "#mzf_bdlink", (function() {
                swalInstance.rapiduploadTask.reset();
                swalInstance.inputView();
            }));
            $(document).on("click", "#mzf_rename", (function() {
                swalInstance.renameView();
            }));
            $(document).on("click", "#kill_donate", (function() {
                GM_setValue(feedbackVer + "_kill_donate", true);
                $("#mzf_donate").remove();
            }));
            $(document).on("click", "#kill_feedback", (function() {
                GM_setValue(donateVer + "_kill_feedback", true);
                $("#mzf_feedback").remove();
            }));
        }
        function addBtn() {
            var targetTag = $(htmlTag);
            if (targetTag.length && targetTag.children.length === 2) targetTag.append(renameBtn).append(bdlinkBtn).append(genBtn); else setTimeout(addBtn, 100);
        }
        var app = __webpack_require__(555);
        var app_default = __webpack_require__.n(app);
        function injectStyle() {
            GM_addStyle(app_default());
            var swalThemes = GM_getValue("swalThemes") || "Default";
            var defaultThemes = GM_getResourceText("swalCss");
            if (swalThemes === "Default") {
                if (defaultThemes) {
                    GM_addStyle(defaultThemes);
                } else {
                    getThemesCss(swalThemes);
                }
                return;
            }
            var ThemesCss = GM_getValue("" + swalCssVer + swalThemes);
            if (ThemesCss) {
                GM_addStyle(ThemesCss);
            } else {
                getThemesCss(swalThemes);
            }
            return;
        }
        function getThemesCss(swalThemes) {
            ajax({
                url: extCssUrl[swalThemes],
                method: "GET"
            }, (function(data) {
                var ThemesCss = data.responseText;
                if (ThemesCss.length < 100) {
                    console.log(swalThemes + " InvalidCss:\n" + ThemesCss);
                    showAlert(appError.SwalCssInvalid);
                    return;
                }
                GM_setValue("" + swalCssVer + swalThemes, ThemesCss);
                GM_addStyle(ThemesCss);
            }), (function(statusCode) {
                showAlert(appError.SwalCssErrReq + ("(http#" + statusCode + ")"));
            }));
        }
        function app_app() {
            if ([ typeof Base64, typeof $, typeof Swal ].indexOf("undefined") !== -1) showAlert(appError.missDepend); else {
                addXMLRequestCallback(XHRcallback);
                Base64.extendString();
                injectStyle();
                jQuery((function() {
                    getAccessToken((function() {
                        loaderAliyun();
                    }));
                }));
            }
        }
        try {
            app_app();
        } catch (error) {
            console.log(error);
        }
    })();
})();