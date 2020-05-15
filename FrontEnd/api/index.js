/**
 * 首页模块
 */
import { Request } from "@/utils/request";
const url = "home/"; // url前缀

// 轮播图
export const GetCarousel = data => {
  return Request({
    url: url + "carousel",
    method: "GET",
    data
  });
}