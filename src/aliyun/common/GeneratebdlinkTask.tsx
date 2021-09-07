import { FileInfo } from "@/common/const";
export default class GeneratebdlinkTask {
  fileInfoList: Array<FileInfo>;
  reset(): void {
    this.fileInfoList = [];
  }
}
