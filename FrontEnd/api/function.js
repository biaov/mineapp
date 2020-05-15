/**
 * 函数模块
 */
import { Request } from "@/utils/request";
const url = "function/"; // url前缀

// 图片预览列表
export const ImgPreview = data => {
  return Request({
    url: url + "picture",
    method: "GET",
    data
  });
}