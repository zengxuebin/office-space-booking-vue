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
