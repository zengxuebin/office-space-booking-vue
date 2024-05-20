import request from '@/utils/request'

/**
 * 获取汇总信息
 * @returns 汇总信息
 */
export const getSummary = () => {
  return request({
    method: 'get',
    url: '/index/summary',
  })
}
