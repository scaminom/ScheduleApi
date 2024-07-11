export const getLocalDate = () => {
  const now = new Date()

  const ecuadorTime = new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)

  const [datePart, timePart] = ecuadorTime.split(', ')
  const [day, month, year] = datePart.split('/')
  const [hour, minute, second] = timePart.split(':')

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
  )
}
