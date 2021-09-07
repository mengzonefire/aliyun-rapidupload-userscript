import Swalbase from "@/common/SwalBase";
import GeneratebdlinkTask from "./GeneratebdlinkTask";
import RapiduploadTask from "./RapiduploadTask";
export const tokenUrl = "https://websv.aliyundrive.com/token/refresh";
export const renameUrl = "https://api.aliyundrive.com/v3/file/update";
export const creatUrl = "https://api.aliyundrive.com/v2/file/create";
export const htmlTag = "div.breadcrumb-wrap--2iqqe";
export const btnStyle =
  'class="button-wrapper--1UkG6" data-type="primary" style="margin-left: 20px;"';
export const renameBtn = `<div id="mzf_rename" ${btnStyle}>重命名</div>`;
export const bdlinkBtn = `<div id="mzf_bdlink" ${btnStyle}>秒传链接</div>`;
export const genBtn = `<div id="mzf_gen" ${btnStyle}>生成秒传</div>`;
export var access_token = "";
export var driver_id = "";
export function setToken(mytoken: string) {
  access_token = mytoken;
}
export function setDriverId(myDriverId: string) {
  driver_id = myDriverId;
}
export const swalInstance = new Swalbase(
  new RapiduploadTask(),
  new GeneratebdlinkTask()
);
export function aliyunErrno(errno: number) {
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
} // 自定义报错
