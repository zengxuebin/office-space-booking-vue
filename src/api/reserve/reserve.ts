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

/**
 * 取消预约
 * @returns 是否成功
 */
export const cancelReserve = (id: any) => {
  return request({
    method: 'post',
    url: '/reserve/space/cancel/' + id,
  })
}

/**
 * 同意邀约
 * @returns 是否成功
 */
export const approveReserve = (id: any) => {
  return request({
    method: 'post',
    url: '/reserved/approve/' + id,
  })
}

/**
 * 拒绝邀约
 * @returns 是否成功
 */
export const rejectReserve = (id: any) => {
  return request({
    method: 'post',
    url: '/reserved/reject/' + id,
  })
}
