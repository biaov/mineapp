/**
 * 账户管理模块
 */
import { Request } from '@/utils/request'
const url = 'admin/' // url前缀

// 登录
export const GoLogin = data => {
  return Request({
    url: url + 'login',
    method: 'POST',
    data
  })
}

// 注册
export const GoRegister = data => {
  return Request({
    url: url + 'register',
    method: 'POST',
    data
  })
}

// 忘记密码
export const GoForget = data => {
  return Request({
    url: url + 'forget',
    method: 'POST',
    data
  })
}
