import { PrismaClient } from '@prisma/client'
import { defineUserFactory, initialize } from '../../__generated__/fabbrica'
import { faker } from '@faker-js/faker'
import { validateCI } from '../validators/user-validator'

const prisma = new PrismaClient()
initialize({ prisma })
export const UserFactory = defineUserFactory()

/**
 * Generates a valid Ecuatorian CI
 * @returns {string} - A valid Ecuatorian CI
 */
export const generateValidCI = (): string => {
  let ci
  let isValid = false

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
