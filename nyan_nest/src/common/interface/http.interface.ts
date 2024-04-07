/**
 * 统一响应格式
 */
export interface ApiResponse<T> {
    code: number,
    msg: string,
    data: T
}

/**
 * 统一分页响应格式
 */

export interface ApiResponsePage<T> {
    code: number,
    msg: string,
    data: T,
    total: number
}


