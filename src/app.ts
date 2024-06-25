import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Luan Ferreira',
    email: 'of.luan.rferreira@gmail.com',
  },
})
