import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryYserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let usersRepository: InMemoryYserRepository
let sut: GetUserProfileUseCase // SUT - system under test

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryYserRepository()
    sut = new GetUserProfileUseCase(usersRepository) // SUT - system under test
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong ID', async () => {
    expect(async () =>
      sut.execute({
        userId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
