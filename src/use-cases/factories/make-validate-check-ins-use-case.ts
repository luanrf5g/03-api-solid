import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkinsRepository)

  return validateCheckInUseCase
}
