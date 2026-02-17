export const ERRORS = {
  SOMETHING_WRONG: 'Something went wrong',
  PROVIDER_FAILED: 'Error logging in through the provider',
  INSUFFICIENT_RIGHTS: 'Insufficient rights',
  TRANSMITTED_DATA: 'Incorrectly transmitted data',
  DELETE_YOURSELF: 'Cannot delete yourself',
  ROLE_YOURSELF: 'You cannot change your role',
  USER_NOT_FOUND: 'User not found',
  ANIME_NOT_FOUND: 'Anime not found, please enter a valid id',
  ANIME_EPISODE_NOT_FOUND: 'Anime episode not found',
  MAX_ANIME_COUNT: (limit: number) =>
    `This anime has a maximum anime count of ${limit} episode(s)`,

  INVALID_EMAIL: 'Invalid email',
  INVALID_SLUG: 'Invalid slug format',
  INVALID_EPISODE_NUMBER: 'Episode number must be greater than or equal to 1',
  INVALID_GENRES: 'Invalid genres. Please enter existing ID.',
  USER_EXISTS: 'User already exists. Use another email',
  EXISTS: (name: string) => `${name} already exists`,
  INVALID_PASSWORD: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  UNAUTHORIZED: 'Invalid jwt',
} as const
