// user.factory.ts
import { Role } from '@prisma/client'
import faker from '../../faker/faker.config'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

export const createUserDtoFactory = (): CreateUserDto => ({
  ci: generateEcuadorianCI(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  role: faker.helpers.enumValue(Role),
})

function generateEcuadorianCI() {
  let ci
  let isValid = false

  // Función para validar el número de cédula según el algoritmo de Ecuador

  // Generar y validar cédulas hasta obtener una válida
  while (!isValid) {
    ci = faker.string.numeric({
      length: 10,
      exclude: ['1'],
      allowLeadingZeros: true,
    })
    isValid = validateCI(ci)
  }

  return ci
}

export function validateCI(ci) {
  let total = 0
  if (ci.length === 10) {
    const digits = ci.split('').map(Number)
    const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2]

    for (let i = 0; i < coef.length; i++) {
      const val = digits[i] * coef[i]
      total += val > 9 ? val - 9 : val
    }

    const checkDigit = total % 10 === 0 ? 0 : 10 - (total % 10)
    return checkDigit === digits[9]
  }

  return false
}
