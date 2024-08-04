export const parseDateFromString = (dateStr) => {
  const [datePart, timePart] = dateStr.split(', ')
  const [day, month, year] = datePart.split('/')
  const [hour, minute, second] = timePart.split(':')

  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(minute, 10),
    parseInt(second, 10),
  )
}

export const getLocalDate = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return parseDateFromString(formatter.format(now))
}

export const toEsEcDate = (date) => {
  const formatter = new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return parseDateFromString(formatter.format(date))
}
