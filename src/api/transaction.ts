import request from '@/utils/request'

/**
 * 分页获取充值信息
 * @returns 充值信息
 */
export const getTransactionPage = (data: any) => {
  return request({
    method: 'post',
    url: '/transaction/page',
    data
  })
}
