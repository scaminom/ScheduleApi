import { PrismaClient } from '@prisma/client'
import { defineUserFactory, initialize } from '../../__generated__/fabbrica'
import { validateCI } from '../validators/user-validator'
import fakerEs from 'src/faker/faker.config'

const prisma = new PrismaClient()
initialize({ prisma })

/**
 * Generates a valid Ecuatorian CI
 * @returns {string} - A valid Ecuatorian CI
 */
export const generateValidCI = (): string => {
  let ci
  let isValid = false

  while (!isValid) {
    ci = fakerEs.string.numeric({
      length: 10,
      exclude: ['1'],
      allowLeadingZeros: true,
    })
    isValid = validateCI(ci)
  }

  return ci
}

export const fakerUserFactorySchema = {
  ci: generateValidCI(),
  firstName: fakerEs.person.firstName(),
  lastName: fakerEs.person.lastName(),
  password: fakerEs.internet.password(),
}

export const onBeforeCreate = async (data) => {
  data.ci = generateValidCI()
}

export const UserFactory = defineUserFactory({
  onBeforeCreate,
  traits: {
    withCi: {
      data: {
        ci: generateValidCI(),
      },
    },
  },
})
