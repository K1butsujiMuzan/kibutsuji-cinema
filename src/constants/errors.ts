import { DELETE_LIMIT } from '@/constants/limits'

export const ERRORS = {
  SOMETHING_WRONG: 'Something went wrong',
  PROVIDER_FAILED: 'Error logging in through the provider',
  INSUFFICIENT_RIGHTS: 'Insufficient rights',
  TRANSMITTED_DATA: 'Incorrectly transmitted data',
  DELETE_DATA_LIMIT: `You can only delete ${DELETE_LIMIT} records per request`,
  DELETE_YOURSELF: 'You cannot delete yourself',
  ROLE_YOURSELF: 'You cannot change your role',
  NOT_FOUND: (label: string) => `${label} not found, please use existing id`,
  NOT_DATA_PERIOD: `There is no data for the selected period`,
  MIN_LENGTH: (label: string, length: number) =>
    `${label} must be at least ${length} characters long.`,
  NEGATIVE_VALUE: (label: string, min: number = 0) =>
    `${label} must be greater than or equal to ${min}`,
  MAX_VALUE: (label: string, max: number) =>
    `${label} cannot be greater than ${max}`,
  MAX_ANIME_COUNT: (limit: number) =>
    `This anime has a maximum anime count of ${limit} episode(s)`,
  INVALID_GENRES: 'Invalid genres. Please enter existing genre names.',
  USER_EXISTS: 'User already exists. Use another email',
  EXISTS: (name: string) => `${name} already exists`,
  INVALID: (label: string) => `Invalid ${label}`,
  INVALID_END_DATE: 'End date cannot be in the past',
  INVALID_TO_DATE: 'Date cannot be earlier than From date',
  INVALID_INT: (label: string) => `${label} can only be an integer`,
  EMAIL_NOT_VERIFIED: 'Email not verified',
  UNAUTHORIZED: 'Unauthorized',
} as const
