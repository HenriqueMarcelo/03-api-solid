import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExisisError } from './erros/user-already-exists-error'

interface RegisterUseCaseRequest {
  password: string
  email: string
  name: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ password, email, name }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExisisError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
