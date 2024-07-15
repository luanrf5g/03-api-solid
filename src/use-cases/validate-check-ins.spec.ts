import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-reposiroty'
import { ValidateCheckInUseCase } from './validate-check-in'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkinsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check Ins Use Case', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkinsRepository)
  })

  it('should be able to valdiate the check-in', async () => {
    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
