import ajax from "@/common/ajax";
import { FileInfo } from "@/common/const";
import { access_token, creatUrl, driver_id } from "./const";
export default class RapiduploadTask {
  interval: number;
  savePath: string;
  isDefaultPath: boolean;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;

  reset(): void {
    this.fileInfoList = [];
    this.onFinish = () => {};
    this.onProcess = () => {};
  }

  start(): void {
    this.interval = this.fileInfoList.length > 1 ? 2000 : 1000;
    let nowPath = location.href.match(/drive\/folder\/([\da-z]+)/);
    this.savePath = nowPath ? nowPath[1] : "root";
    this.saveFile(0);
  }

  /**
   * @description: 转存秒传 接口1
   * @param {number} i
   */
  saveFile(i: number): void {
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    let file = this.fileInfoList[i];
    ajax(
      {
        url: creatUrl,
        method: "POST",
        responseType: "json",
        headers: {
          "Content-type": "application/json;charset=utf-8",
          Authorization: access_token,
        },
        data: JSON.stringify({
          drive_id: driver_id,
          parent_file_id: this.savePath,
          size: file.size,
          name: file.path,
          content_hash: file.hash,
          type: "file",
          check_name_mode: "refuse",
          content_hash_name: "sha1",
        }),
      },
      (data) => {
        data = data.response;
        if (data.exist) file.errno = -8;
        else if (!data.rapid_upload) file.errno = 404;
        setTimeout(() => {
          this.saveFile(i + 1);
        }, this.interval);
      },
      (statusCode) => {
        file.errno = statusCode;
        this.saveFile(i + 1);
      }
    );
  }
}
