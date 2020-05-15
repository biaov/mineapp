/*!
 * Copyright (c) Author biaov
 * Email biaov@qq.com
 * Date 2020-03-05
 */

import store from "@/store";
import Variable from "../global/variable";
import Api from "../global/function";
const { BaseUrl } = Variable;
/**
 * 请求API
 * @param {Object} Obj - 数据对象
 * @param {String} obj.url - 请求路径
 * @param {Object} [obj.data={}] - 请求参数对象
 * @param {String} [obj.method=POST] - 请求方法
 * @param {Object} [obj.header={}] - 请求头部信息
 * @param {Boolean} [isToken=undefined] - 是否需要token
 * @returns {Object} - Promise Object
 */
export const Request = async obj => {
  return new Promise(async (resolve, reject) => {
    let { url, data, method, header, isToken } = obj;
    if (!url) return;
    url = BaseUrl + url; // 请求地址
    data = data || {}; // 请求参数
    method = method || "POST"; // 请求方法
    header = header || {}; // 请求header信息
    // 如果token为true,则添加token到header信息里去
    !!isToken && (header.token = store.getters.userInfo.token);
    // 请求返回信息
    const [error, res] = await uni.request({
      url,
      data,
      method,
      header,
      dataType: "json"
      // sslVerify: false
    });
    if (!!error) {
      Api.Msg("网络错误");
    } else {
      // 判断状态值是否为200,200=>成功
      if (res.statusCode === 200) {
        resolve(res.data);
      } else {
        console.log("url:" + url);
        console.log("status:" + res.statusCode);
        console.log("ajaxdata:" + JSON.stringify(data));
        reject(error);
        // console.log("res.data: " + JSON.stringify(res.data));
      }
    }
  });
}
/**
 * 上传图片
 * @param {Object} obj - 数据对象
 * @param {String} obj.url - 请求路径
 * @param {Object} [obj.data={}] - 请求参数对象
 * @param {Boolean} [isToken=undefined] - 是否需要token
 * @returns {Object} - Promise Object
 */
export const UploadImg = async obj => {
  return new Promise(async (resolve, reject) => {
    let { url, data, isToken } = obj;
    if (!url) return;
    url = BaseUrl + url; // 请求地址
    let filePath = data || ""; // 文件路径
    let header = {}; // 请求header信息
    // 如果token为true,则添加token到header信息里去
    !!isToken && (header.token = store.getters.userInfo.token);
    // 请求返回信息
    const [error, res] = await uni.uploadFile({
      url,
      filePath,
      fileType: 'image',
      name: 'file',
      formData: {},
      header
    });
    if (!!error) {
      Api.Msg("网络错误");
    } else {
      // 判断状态值是否为200,200=>成功
      if (res.statusCode === 200) {
        resolve(JSON.parse(res.data));
      } else {
        // reject(error);
        console.log("url:" + url);
        console.log("status:" + res.statusCode);
        // console.log("ajaxdata:" + JSON.stringify(ajaxdata));
        // console.log("res.data: " + JSON.stringify(res.data));
      }
    }
  });
}