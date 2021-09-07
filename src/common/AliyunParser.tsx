/*
 * @Author: mengzonefire
 * @Date: 2021-08-26 12:01:28
 * @LastEditTime: 2021-09-07 23:55:33
 * @LastEditors: mengzonefire
 * @Description: 秒传链接解析器
 */

import { FileInfo } from "./const";

export default function aliyunParser() {}

aliyunParser.parse = function generalDuCodeParse(szUrl: string) {
  let r: any;
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

aliyunParser.parseAliyun_v1 = function (szUrl: string): Array<FileInfo> {
  return szUrl
    .split("\n")
    .map(function (z) {
      return z
        .trim()
        .match(/aliyunpan:\/\/([\s\S]+)\|([\dA-F]{40})\|([\d]{1,20})/);
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info) {
      return {
        hash: info[2],
        size: Number(info[3]),
        path: info[1],
      };
    });
};

aliyunParser.parseAliyun_v2 = function (szUrl: string): Array<FileInfo> {
  return szUrl
    .split("\n")
    .map(function (z) {
      return z.trim().match(/115:\/\/([\s\S]+)\|([\d]{1,20})\|([\dA-F]{40})/);
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info) {
      return {
        hash: info[3],
        size: Number(info[2]),
        path: info[1],
      };
    });
};
