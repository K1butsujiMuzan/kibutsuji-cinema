export const createImageUrl = (key: string): string => {
  return `${process.env.NEON_BUCKET_URL}/${key}`
}
