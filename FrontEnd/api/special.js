/**
 * 特效模块
 */
import { Request } from "@/utils/request";
const url = "special/"; // url前缀

// 特效列表
export const GetSpecialList = data => {
  return Request({
    url: url + "specialList",
    method: "GET",
    data
  });
}