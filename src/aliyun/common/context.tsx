import { ListInfo } from "@/common/const";

export var pathInfoList = {};
export var searchInfoList = {};
export function XHRcallback(xhr: XMLHttpRequest) {
  let action = "";
  if (xhr.responseURL == "https://api.aliyundrive.com/adrive/v3/file/list") {
    action = "list";
    pathInfoList = {};
  } else if (
    xhr.responseURL == "https://api.aliyundrive.com/adrive/v3/file/search"
  ) {
    action = "search";
    searchInfoList = {};
  } else {
    return;
  }
  JSON.parse(xhr.response).items.forEach(function (item: any) {
    let data: ListInfo;
    if (item.type == "folder") {
      data = { file_id: item.file_id };
    } else {
      data = {
        file_id: item.file_id,
        size: item.size,
        hash: item.content_hash,
      };
    }
    if (action == "list") pathInfoList[item.name] = data;
    else if (action == "search") searchInfoList[item.name] = data;
  });
}
