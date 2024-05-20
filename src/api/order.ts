import request from '@/utils/request'

/**
 * 分页获取订单信息
 * @returns 充值信息
 */
export const getOrderPage = (data: any) => {
  return request({
    method: 'post',
    url: '/order/page',
    data
  })
}
