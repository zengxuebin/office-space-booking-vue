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

 /**
 * 获取我的信誉分
 * 
 * @returns 信誉分信息
 */
export const getMyCreditScore = () => {
  return request({
    method: 'get',
    url: '/creditScore/myCredit'
  })
}