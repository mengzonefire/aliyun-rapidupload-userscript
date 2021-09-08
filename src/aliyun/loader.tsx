import { updateInfoVer, donateVer, feedbackVer, TAG } from "@/common/const";
import initQueryLink from "@/common/initQueryLink";
import {
  bdlinkBtn,
  genBtn,
  htmlTag,
  htmlTag2,
  renameBtn,
  swalInstance,
} from "./common/const";

export function loaderAliyun(): void {
  let bdlink = initQueryLink(); // 解析url中的秒传链接
  if (bdlink) swalInstance.inputView({ inputValue: bdlink });
  // 解析到秒传链接, 弹出转存窗口
  else if (!GM_getValue(`${updateInfoVer}_no_first`))
    swalInstance.updateInfo(() => {
      GM_setValue(`${updateInfoVer}_no_first`, true);
    }); // 检查是否首次运行, 若是则弹出更新信息窗口

  // 添加按钮元素并绑定事件
  console.info("%s DOM方式安装，若失效请报告。", TAG);
  addBtn();
  $(document).on("click", "#mzf_gen", () => {
    swalInstance.generatebdlinkTask.reset();
    swalInstance.genFileWork();
  });
  $(document).on("click", "#mzf_bdlink", () => {
    swalInstance.rapiduploadTask.reset();
    swalInstance.inputView();
  });
  $(document).on("click", "#mzf_rename", () => {
    swalInstance.renameView();
  });

  // 绑定其他按钮事件
  $(document).on("click", "#kill_donate", function () {
    GM_setValue(`${feedbackVer}_kill_donate`, true);
    $("#mzf_donate").remove();
  }); // 赞助提示 "不再显示" 按钮
  $(document).on("click", "#kill_feedback", function () {
    GM_setValue(`${donateVer}_kill_feedback`, true);
    $("#mzf_feedback").remove();
  }); // 反馈提示 "不再显示" 按钮
} // 百度秒传脚本主函数入口

function addBtn() {
  let targetTag = $(htmlTag);
  if (targetTag.length && targetTag.children.length === 2) {
    targetTag.append(renameBtn).append(bdlinkBtn).append(genBtn);
    addObserver();
  } else setTimeout(addBtn, 100);
}

function addObserver() {
  let MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  let observer = new MutationObserver(function () {
    let targetTag = $(htmlTag);
    if (targetTag.length && targetTag.children.length === 2)
      targetTag.append(renameBtn).append(bdlinkBtn).append(genBtn);
  });
  observer.observe($(htmlTag2)[0], { childList: true });
}
