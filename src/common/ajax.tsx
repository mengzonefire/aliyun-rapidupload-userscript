/*
 * @Author: mengzonefire
 * @Date: 2021-08-27 14:48:24
 * @LastEditTime: 2021-08-30 02:52:03
 * @LastEditors: mengzonefire
 * @Description: 自封装JQ ajax方法
 */

import { ajaxError } from "./const";

export default function ajax(
  config: any,
  callback: (response: any) => void,
  failback: (statusCode: number) => void
) {
  GM_xmlhttpRequest({
    ...config,
    onload: (r: any) => {
      // debug
      // console.log(r);
      if (Math.floor(r.status / 100) === 2) callback(r);
      else failback(r.status);
    },
    onerror: () => {
      failback(ajaxError);
    },
  });
}
