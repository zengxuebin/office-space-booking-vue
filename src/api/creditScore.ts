import request from '@/utils/request'

/**
 * 分页获取信誉分信息
 * @returns 信誉分信息
 */
export const getCreditScorePage = (data: any) => {
  return request({
    method: 'post',
    url: '/creditScore/page',
    data
  })
}
