import request from '@/utils/request'

/**
 * 登录
 * @param data username password
 * @returns token 
 */
export const login = (data: any) => {
  return request({
    method: 'post',
    headers: {
      isToken: false
    },
    url: '/auth/login',
    data
  })
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getInfo = () => {
  return request({
    method: 'get',
    url: '/auth/getUserInfo'
  })
}

/**
 * 退出登录
 * @returns 结果
 */
export const logout = () => {
  return request({
    method: 'post',
    url: '/auth/logout'
  })
}