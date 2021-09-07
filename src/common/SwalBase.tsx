/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2021-09-08 00:12:42
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */
import GeneratebdlinkTask from "@/aliyun/common/GeneratebdlinkTask";
import RapiduploadTask from "@/aliyun/common/RapiduploadTask";
import {
  bdlinkPattern,
  donateVer,
  feedbackVer,
  FileInfo,
  htmlDonate,
  htmlFeedback,
} from "./const";
import aliyunParser from "./AliyunParser";
import { SwalConfig } from "./SwalConfig";
import { parsefileInfo, showAlert } from "./utils";
import { access_token, driver_id, renameUrl } from "@/aliyun/common/const";
import { pathInfoList, searchInfoList } from "@/aliyun/common/context";
import ajax from "./ajax";

export default class Swalbase {
  swalArgs: any;
  constructor(
    readonly rapiduploadTask: RapiduploadTask,
    readonly generatebdlinkTask: GeneratebdlinkTask
  ) {}

  // 合并swal参数
  mergeArg(...inputArgs: any) {
    let output = {};
    $.extend(output, this.swalArgs, ...inputArgs);
    return output;
  }

  // 点击 "秒传链接" 后显示的弹窗
  inputView(swalArg?: any) {
    Swal.fire(this.mergeArg(SwalConfig.inputView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed) {
          if (result.value === "set") this.settingView();
          else {
            this.rapiduploadTask.fileInfoList = aliyunParser.parse(
              result.value
            );
            this.processView();
          }
        }
      }
    );
  }

  // 转存过程中的弹窗
  processView() {
    let swalArg = {
      title: "文件提取中",
      html: "正在转存第 <file_num>0</file_num> 个",
      willOpen: () => {
        Swal.showLoading();
        this.saveFileWork();
      },
    };
    Swal.fire(this.mergeArg(SwalConfig.processView, swalArg));
  }

  // 转存/生成秒传完成的弹窗
  finishView(isGen: boolean) {
    let action = isGen ? "生成" : "转存";
    let fileInfoList = isGen
      ? this.generatebdlinkTask.fileInfoList
      : this.rapiduploadTask.fileInfoList;
    let parseResult = parsefileInfo(fileInfoList);
    if (isGen) this.rapiduploadTask.fileInfoList = parseResult.successList;
    let html =
      (parseResult.htmlInfo && isGen ? "<p><br></p>" : "") +
      parseResult.htmlInfo; // 添加失败列表, 生成模式下添加顶部空行分隔
    let htmlFooter = "";
    if (!GM_getValue(`${donateVer}_kill_donate`)) htmlFooter += htmlDonate; // 添加赞助入口提示
    if (!GM_getValue(`${feedbackVer}_kill_donate`)) htmlFooter += htmlFeedback; // 添加反馈入口提示
    if (htmlFooter) htmlFooter = "<p><br></p>" + htmlFooter; // 添加底部空行分隔
    let swalArg = {
      title: `${action}完毕 共${fileInfoList.length}个, 失败${parseResult.failedCount}个!`,
      confirmButtonText:
        parseResult.failedCount !== fileInfoList.length && isGen
          ? "复制秒传代码"
          : "确认",
      html: html + htmlFooter,
    };
    Swal.fire(this.mergeArg(SwalConfig.finishView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed) {
          if (isGen) {
            // 生成模式, "复制秒传代码"按钮
            GM_setClipboard(parseResult.bdcode);
          } else {
            // 转存模式, "确定" 按钮
            let alink = location.href.match(bdlinkPattern)
            if (alink) location.href = location.href.replace(alink[0], "")
            else location.reload();
          }
        }
      }
    );
  }

  // 重命名输入框
  renameView() {
    let infoList = {},
      selectFile: string,
      selectNode: any = document.querySelectorAll(
        'div[data-is-selected="true"]'
      );
    if (selectNode.length === 1)
      selectFile = selectNode[0].innerText.split("\n\n")[0];
    else {
      showAlert("未选中文件/选中了多个文件");
      return;
    }
    infoList =
      location.href.indexOf("/drive/search/") !== -1
        ? searchInfoList
        : pathInfoList;

    Swal.fire(
      this.mergeArg(SwalConfig.renameView, {
        inputValue: selectFile,
        inputValidator: (value: string) => {
          if (value === selectFile) return;
          else if (infoList[value]) return "路径下存在同名文件/文件夹";
        },
      })
    ).then((result: any) => {
      if (result.isConfirmed) {
        if (result.value === selectFile) return;
        else this.renameWork(infoList[selectFile].file_id, result.value);
      }
    });
  }

  // 设置页
  settingView() {
    Swal.fire(this.mergeArg(SwalConfig.settingView)).then((result: any) => {
      if (result.isConfirmed) {
        GM_setValue("swalThemes", result.value);
        Swal.close();
        Swal.fire(this.mergeArg(SwalConfig.settingWarning));
      }
    });
  }

  // 更新信息页
  updateInfo(onConfirm: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.updateInfo)).then((result: any) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  // 以下的方法都是任务操作逻辑, 不是弹窗逻辑
  saveFileWork() {
    this.rapiduploadTask.onFinish = () => {
      this.finishView(false);
    };
    this.rapiduploadTask.onProcess = (i, fileInfoList) => {
      Swal.getHtmlContainer().querySelector("file_num").textContent = `${
        i + 1
      } / ${fileInfoList.length}`;
    };
    this.rapiduploadTask.start(); // 开始转存任务
  }

  genFileWork() {
    let infoList = {},
      selectList = [],
      selectNode = document.querySelectorAll('div[data-is-selected="true"]');
    if (selectNode.length)
      selectNode.forEach((item: any) => {
        selectList.push(item.innerText.split("\n\n")[0]);
      });
    else {
      showAlert("未选中文件");
      return;
    }
    infoList =
      location.href.indexOf("/drive/search/") !== -1
        ? searchInfoList
        : pathInfoList;
    // 判断是否在搜索页面
    selectList.forEach((item) => {
      let fileInfo: FileInfo = infoList[item].hash // 没有hash就是文件夹
        ? {
            path: item,
            hash: infoList[item].hash,
            size: infoList[item].size,
          }
        : {
            path: item,
            errno: 900,
          };
      this.generatebdlinkTask.fileInfoList.push(fileInfo);
    });
    this.finishView(true);
  }

  renameWork(file_id: string, name: string) {
    ajax(
      {
        url: renameUrl,
        method: "POST",
        responseType: "json",
        headers: {
          "Content-type": "application/json;charset=utf-8",
          Authorization: access_token,
        },
        data: JSON.stringify({
          drive_id: driver_id,
          file_id: file_id,
          name: name,
          check_name_mode: "refuse",
        }),
      },
      () => {
        location.reload();
      },
      (statusCode: any) => {
        showAlert(`重命名失败(${statusCode})`);
      }
    );
  }
}
