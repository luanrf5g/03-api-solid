/* eslint-disable @typescript-eslint/no-explicit-any */
import { hash } from 'bcryptjs'
import { UsersRepositories } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCasesRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(public usersRepository: UsersRepositories) {}

  async execute({ name, email, password }: RegisterUseCasesRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
