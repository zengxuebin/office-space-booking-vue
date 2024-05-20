import request from '@/utils/request'

/**
 * 获取部门候选列表
 * @returns 用户信息
 */
export const getDeptOption = () => {
  return request({
    method: 'get',
    url: '/option/dept'
  })
}

/**
 * 获取类别候选列表
 * @returns 用户信息
 */
export const getCategoryOption = () => {
  return request({
    method: 'get',
    url: '/option/category'
  })
}


/**
 * 获取位置候选列表
 * @returns 用户信息
 */
export const getLocationOption = () => {
  return request({
    method: 'get',
    url: '/option/location'
  })
}

/**
 * 获取用户列表
 * @returns 用户信息
 */
export const getUserOption = () => {
  return request({
    method: 'get',
    url: '/option/sysUser'
  })
}


/**
 * 获取账户列表
 * @returns 账户信息
 */
export const getAccountOption = () => {
  return request({
    method: 'get',
    url: '/option/account'
  })
}

/**
 * 获取空间列表
 * @returns 账户信息
 */
export const getSpaceOption = () => {
  return request({
    method: 'get',
    url: '/option/space'
  })
}
