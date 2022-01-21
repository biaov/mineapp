/**
 * 公共模块
 */
import { Request, UploadImg } from '@/utils/request'
const url = 'public/' // url前缀

// APP当前最新版本
export const GetUpdateInfo = data => {
  return Request({
    url: url + 'versionInfo',
    method: 'GET',
    data
  })
}

// 上传图片
export const GoUploadImg = data => {
  return UploadImg({
    url: url + 'uploadImg',
    data,
    isToken: true
  })
}

// 帮助中心列表
export const GetHelpList = data => {
  return Request({
    url: url + 'helpList',
    method: 'GET',
    data
  })
}

// 帮助中心详情
export const GetHelpDetails = data => {
  return Request({
    url: url + 'helpDetails',
    method: 'GET',
    data
  })
}

// 公告列表
export const GetNoticeList = data => {
  return Request({
    url: url + 'noticeList',
    method: 'GET',
    data
  })
}

// 公告详情
export const GetNoticeDetails = data => {
  return Request({
    url: url + 'noticeDetails',
    method: 'GET',
    data
  })
}
