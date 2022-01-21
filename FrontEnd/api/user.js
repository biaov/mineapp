/**
 * 特效模块
 */
import { Request } from '@/utils/request'
const url = 'user/' // url前缀
const isToken = true

// 用户信息
export const GetUserInfo = data => {
  return Request({
    url: url + 'userInfo',
    method: 'GET',
    data,
    isToken
  })
}

// 修改用户信息(昵称、头像、性别、签名)
export const GoEditInfo = data => {
  return Request({
    url: url + 'editInfo',
    method: 'POST',
    data,
    isToken
  })
}

// 修改密码
export const GoEditPwd = data => {
  return Request({
    url: url + 'editPwd',
    method: 'POST',
    data,
    isToken
  })
}

// 用户笔记列表
export const GetNoteList = data => {
  return Request({
    url: url + 'noteList',
    method: 'GET',
    data,
    isToken
  })
}

// 批量删除用户笔记列表
export const GoNoteDelete = data => {
  return Request({
    url: url + 'noteDelete',
    method: 'POST',
    data,
    isToken
  })
}

// 用户笔记详情
export const GetNoteDetails = data => {
  return Request({
    url: url + 'noteDetails',
    method: 'GET',
    data,
    isToken
  })
}

// 用户笔记提交
export const GoNoteSubmit = data => {
  return Request({
    url: url + 'noteSubmit',
    method: 'POST',
    data,
    isToken
  })
}

// 我的反馈列表
export const GetFeedbackList = data => {
  return Request({
    url: url + 'feedbackList',
    method: 'GET',
    data,
    isToken
  })
}

// 批量删除我的反馈列表
export const GoFeedbackDelete = data => {
  return Request({
    url: url + 'feedbackDelete',
    method: 'POST',
    data,
    isToken
  })
}

// 我的反馈详情
export const GetFeedbackDetails = data => {
  return Request({
    url: url + 'feedbackDetails',
    method: 'GET',
    data,
    isToken
  })
}

// 我的反馈提交
export const GoFeedbackSubmit = data => {
  return Request({
    url: url + 'feedbackSubmit',
    method: 'POST',
    data,
    isToken
  })
}
