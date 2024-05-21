import request from '@/utils/request'

/**
 * 分页获取可预约工位
 * @returns 分页可预约工位
 */
export const getPageOfficeSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/public/page',
    data
  })
}
