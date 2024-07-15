import { Gym, Prisma } from '@prisma/client'

export interface FetchManyNeabyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  fetchManyNeaby(params: FetchManyNeabyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
