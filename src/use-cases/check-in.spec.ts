import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-reposiroty'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckinUseCase } from './check-in'

let checkinsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(checkinsRepository)
  })

  it('should be able to check in', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
