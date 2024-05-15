import request from '@/utils/request'

/**
 * 获取部门选选列表
 * @returns 用户信息
 */
export const getDeptOption = () => {
  return request({
    method: 'get',
    url: '/option/dept'
  })
}