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