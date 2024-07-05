/* eslint-disable @typescript-eslint/no-explicit-any */
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCasesRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(public usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCasesRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
