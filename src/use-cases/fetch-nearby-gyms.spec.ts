import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNeabyGymUseCase } from './fetch-nearby-gyms'
import { beforeEach, describe, expect, it } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNeabyGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNeabyGymUseCase(gymsRepository)
  })

  it('should be able to fetch neraby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -8.2723872,
      longitude: -35.9478763,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -8.1158509,
      longitude: -35.2953573,
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.2723872,
      userLongitude: -35.9478763,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
