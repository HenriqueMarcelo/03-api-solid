import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FatchNearbyGymnRequest {
  userLatitude: number
  userLongitude: number
}

interface FatchNearbyGymnResponse {
  gyms: Gym[]
}

export class FatchNearbyGymnUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FatchNearbyGymnRequest): Promise<FatchNearbyGymnResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
