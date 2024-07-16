import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-reposiroty'
import { ValidateCheckInUseCase } from './validate-check-in'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateValidationCheckInError } from './errors/late-validation-check-in-error'

let checkinsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check Ins Use Case', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkinsRepository)

    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.useRealTimers()
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

  it('should not be able to valited the check-in after 20 minutes  of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMiliseconds = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateValidationCheckInError)
  })
})
