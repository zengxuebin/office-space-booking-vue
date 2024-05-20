import request from '@/utils/request'

/**
 * 分页获取账户信息
 * @returns 账户信息
 */
export const getAccountPage = (data: any) => {
  return request({
    method: 'post',
    url: '/account/page',
    data
  })
}
