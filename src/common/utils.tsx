import {
  tokenUrl,
  setToken,
  setDriverId,
  aliyunErrno,
} from "@/aliyun/common/const";
import ajax from "./ajax";
import { FileInfo, TAG } from "./const";

/**
 * @description: 弹出一个文本提示框
 * @param {string} text
 */
export function showAlert(text: string): void {
  alert(`${TAG}:\n${text}`);
}

/**
 * @description: 解析文件信息, 返回转存结果列表html, 秒传链接, 失败文件个数, 成功的文件信息列表
 * @param {Array} fileInfoList
 */
export function parsefileInfo(fileInfoList: Array<FileInfo>) {
  let bdcode = "";
  let failedInfo = "";
  let failedCount = 0;
  let successList = [];
  fileInfoList.forEach((item) => {
    if (item.errno) {
      failedCount++;
      failedInfo += `<p>文件：${item.path}</p><p>失败原因：${aliyunErrno(
        item.errno
      )}(#${item.errno})</p>`;
    } else {
      bdcode += `aliyunpan://${item.path}|${item.hash}|${item.size}\n`;
      successList.push(item);
    }
  });
  if (failedInfo) failedInfo = "<p>失败文件列表:</p>" + failedInfo;
  bdcode = bdcode.trim();
  return {
    htmlInfo: failedInfo,
    failedCount: failedCount,
    bdcode: bdcode,
    successList: successList,
  };
}

/**
 * @description: 获取access_token 和 drive_id
 */
export function getAccessToken(onFinish: () => void) {
  ajax(
    {
      url: tokenUrl,
      method: "POST",
      responseType: "json",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      data: JSON.stringify({
        refresh_token: JSON.parse(localStorage.getItem("token")).refresh_token,
      }),
    },
    (data) => {
      data = data.response;
      if (data.access_token) setToken(data.access_token);
      else {
        showAlert(`获取token失败, 请尝试刷新页面, 或重新登录`);
        return;
      }
      let drive_id = localStorage.getItem("token");
      if (drive_id) setDriverId(JSON.parse(drive_id).default_drive_id);
      else {
        showAlert(`获取driveId失败, 请尝试刷新页面, 或重新登录`);
        return;
      }
      onFinish();
    },
    (statusCode) => {
      showAlert(`获取token失败(${statusCode}), 请尝试刷新页面, 或重新登录`);
    }
  );
}

/**
 * @description: 添加原生XHR回调
 */
export function addXMLRequestCallback(callback: any) {
  (function (open) {
    XMLHttpRequest.prototype.open = function () {
      this.addEventListener(
        "readystatechange",
        function () {
          if (this.readyState === 4) {
            callback(this);
          }
        },
        false
      );
      open.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype.open);
}
