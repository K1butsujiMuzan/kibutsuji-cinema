export const dateCheck = (value: string): boolean => {
  return !isNaN(Date.parse(value))
}

export const endDateCheck = (value: string): boolean => {
  return new Date(value).getTime() > Date.now()
}

export const dateTransformer = (value: Date) => {
  return `${value.getDate().toString().padStart(2, '0')}.${(value.getMonth() + 1).toString().padStart(2, '0')}.${value.getFullYear()}`
}
