import request from '@/utils/request'

/**
 * 分页获取用户信息
 * @returns 分页用户
 */
export const getPageUser = (data: any) => {
  return request({
    method: 'post',
    url: '/system/user/page',
    data
  })
}

