import { Gym, Prisma } from '@prisma/client'

export interface FetchManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  fetchManyNearby(params: FetchManyNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
