import request from '@/utils/request'

/**
 * 分页获取预约信息
 * @returns 预约信息
 */
export const getReservePage = (data: any) => {
  return request({
    method: 'post',
    url: '/reserve/page',
    data
  })
}
