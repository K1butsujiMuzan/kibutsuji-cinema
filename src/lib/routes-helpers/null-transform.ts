export const nullTransform = (value: string | null) => {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null
}
