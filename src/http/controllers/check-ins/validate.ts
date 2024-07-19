import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckinParamsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
