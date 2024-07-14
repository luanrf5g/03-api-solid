import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-reposiroty'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkinsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkinsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2723872),
      longitude: new Decimal(-35.9478763),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.2723872,
      userLongitude: -35.9478763,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.2723872,
      userLongitude: -35.9478763,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -8.2723872,
        userLongitude: -35.9478763,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check twice but in differents days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.2723872,
      userLongitude: -35.9478763,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.2723872,
      userLongitude: -35.9478763,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym2',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2723872),
      longitude: new Decimal(-35.9478763),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -8.1507111,
        userLongitude: -35.8842351,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
