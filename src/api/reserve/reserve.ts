import request from '@/utils/request'

/**
 * 预约共享工位
 * @returns 是否成功
 */
export const reserveOfficeSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/reserve/space/office',
    data
  })
}

/**
 * 预约共享工位
 * @returns 是否成功
 */
export const reservePublicSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/reserve/space/public',
    data
  })
}
