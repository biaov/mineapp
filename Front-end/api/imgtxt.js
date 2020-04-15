/**
 * 图文模块
 */
import { Request } from "@/utils/request";
const url = "imgtxt/"; // url前缀

// 文章列表
export const GetArticleList = data => {
  return Request({
    url: url + "articleList",
    method: "GET",
    data
  });
}

// 文章详情
export const GetArticleDetails = data => {
  return Request({
    url: url + "articleDetails",
    method: "GET",
    data
  });
}