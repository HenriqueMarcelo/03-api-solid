import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  password: string
  email: string
  name: string
}

export async function registerUseCase({
  password,
  email,
  name,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const presmaUserRepository = new PrismaUsersRepository()

  await presmaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
