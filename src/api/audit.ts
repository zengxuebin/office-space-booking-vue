import request from '@/utils/request'

/**
 * 分页获取审核信息
 * @returns 审核信息
 */
export const getAuditPage = (data: any) => {
  return request({
    method: 'post',
    url: '/audit/page',
    data
  })
}

/**
 * 通过审核
 * @returns 是否成功
 */
export const approveReserve = (data: any) => {
  return request({
    method: 'post',
    url: '/audit/approve',
    data
  })
}

/**
 * 批量通过审核
 * @returns 是否成功
 */
export const batchApproveReserve = (data: any) => {
  return request({
    method: 'post',
    url: '/audit/batchApprove',
    data
  })
}

/**
 * 拒绝审核
 * @returns 是否成功
 */
export const rejectReserve = (data: any) => {
  return request({
    method: 'post',
    url: '/audit/reject',
    data
  })
}

/**
 * 批量拒绝审核
 * @returns 是否成功
 */
export const batchRejectReserve = (data: any) => {
  return request({
    method: 'post',
    url: '/audit/batchReject',
    data
  })
}