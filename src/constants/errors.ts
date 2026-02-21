export const ERRORS = {
  SOMETHING_WRONG: 'Something went wrong',
  PROVIDER_FAILED: 'Error logging in through the provider',
  INSUFFICIENT_RIGHTS: 'Insufficient rights',
  TRANSMITTED_DATA: 'Incorrectly transmitted data',
  DELETE_DATA_LIMIT: 'You can only delete 10 records per request',
  DELETE_YOURSELF: 'Cannot delete yourself',
  ROLE_YOURSELF: 'You cannot change your role',
  NOT_FOUND: (label: string) => `${label} not found, please use existing id`,
  ANIME_EPISODE_NOT_FOUND: 'Anime episode not found',
  MIN_LENGTH: (label: string, length: number) =>
    `${label} must be at least ${length} characters long.`,

  MAX_ANIME_COUNT: (limit: number) =>
    `This anime has a maximum anime count of ${limit} episode(s)`,

  INVALID_EMAIL: 'Invalid email',
  INVALID_SLUG: 'Invalid slug format',
  NEGATIVE_VALUE: (label: string, min: number = 0) =>
    `${label} must be greater than or equal to ${min}`,
  MAX_VALUE: (label: string, max: number) =>
    `${label} cannot be greater than ${max}`,
  INVALID_GENRES: 'Invalid genres. Please enter existing ID.',
  USER_EXISTS: 'User already exists. Use another email',
  EXISTS: (name: string) => `${name} already exists`,
  INVALID_PASSWORD: 'Invalid email or password',
  INVALID: (label: string) => `Invalid ${label}`,
  INVALID_INT: (label: string) => `${label} can only be an integer`,
  EMAIL_NOT_VERIFIED: 'Email not verified',
  UNAUTHORIZED: 'Invalid jwt',
} as const
