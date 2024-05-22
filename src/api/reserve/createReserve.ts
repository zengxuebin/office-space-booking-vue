import request from '@/utils/request'

/**
 * 分页获取我发起的预约
 * @returns 分页我发起的预约
 */
export const getPageReserveCreate = (data: any) => {
  return request({
    method: 'post',
    url: '/reserve/create/page',
    data
  })
}

/**
 * 分页获取我收到的邀约
 * @returns 分页我收到的邀约
 */
export const getPageReserved = (data: any) => {
  return request({
    method: 'post',
    url: '/reserved/page',
    data
  })
}