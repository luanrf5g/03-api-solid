import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNeabyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNeabyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNeabyGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNeabyGymsUseCaseRequest): Promise<FetchNeabyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchManyNeaby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
