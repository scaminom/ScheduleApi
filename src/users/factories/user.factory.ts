import { PrismaClient } from '@prisma/client'
import { defineUserFactory, initialize } from '../../__generated__/fabbrica'
import { faker } from '@faker-js/faker'
import { validateCI } from '../validators/user-validator'

const prisma = new PrismaClient()
initialize({ prisma })
export const UserFactory = defineUserFactory()

export const generateValidCI = () => {
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
