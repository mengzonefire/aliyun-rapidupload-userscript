import { doc, linkStyle } from "./const";
import DuParser from "./AliyunParser";
import updateInfo from "@/components/updateInfo.html";

// 各Swal弹窗的固定参数配置:
export const SwalConfig = {
  inputView: {
    title: "请输入秒传",
    input: "textarea",
    showCancelButton: true,
    inputPlaceholder:
      "[支持aliyun/115][支持批量(换行分隔)]\n[输入set进入设置页]",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value: string) => {
      if (!value) {
        return "链接不能为空";
      }
      if (value === "set") {
        return;
      }
      if (!DuParser.parse(value).length) {
        return `<p>未识别到正确的链接 <a href="${doc.linkTypeDoc}" ${linkStyle}>查看支持格式</a></p>`;
      }
    },
  },

  renameView: {
    title: "请输入秒传",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },

  processView: {
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
  },

  finishView: {
    showCloseButton: true,
    allowOutsideClick: false,
  },

  updateInfo: {
    title: `秒传链接提取[阿里版] 更新内容`,
    showCloseButton: true,
    allowOutsideClick: false,
    confirmButtonText: "知道了",
    html: updateInfo,
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
      "WordPress Admin": "WordPressAdmin 灰色主题",
    },
  },

  settingWarning: {
    title: "设置成功 刷新页面生效",
    showCloseButton: true,
    allowOutsideClick: false,
    confirmButtonText: "知道了",
  },
};
