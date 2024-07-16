import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNeabyGymUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNeabyGymsUseCase = new FetchNeabyGymUseCase(gymsRepository)

  return fetchNeabyGymsUseCase
}
