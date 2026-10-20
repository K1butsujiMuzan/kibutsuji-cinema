export type TServerErrorResponseCode =
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'UNKNOWN_ERROR'
  | 'TRANSMITTED_DATA'
  | 'TO_MANY_REQUESTS'

export type TServerErrorResponse = {
  status: 400 | 401 | 403 | 404 | 409 | 429 | 500
  message: string
  code: TServerErrorResponseCode
  details?: Record<string, string>
}

export type TServerResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: TServerErrorResponse
    }
