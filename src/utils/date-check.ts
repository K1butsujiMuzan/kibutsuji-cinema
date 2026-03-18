export const dateCheck = (value: string): boolean => {
  return !isNaN(Date.parse(value))
}

export const endDateCheck = (value: string): boolean => {
  return new Date(value).getTime() > Date.now()
}
