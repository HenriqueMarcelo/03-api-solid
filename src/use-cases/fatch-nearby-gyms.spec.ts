import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FatchNearbyGymnUserCase } from './fatch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FatchNearbyGymnUserCase // SUT - system under test

describe('Fatch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FatchNearbyGymnUserCase(gymsRepository) // SUT - system under test
  })

  it('should be able to fatch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.2498094,
      longitude: -42.4331477,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.1582797,
      longitude: -42.4221876,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
