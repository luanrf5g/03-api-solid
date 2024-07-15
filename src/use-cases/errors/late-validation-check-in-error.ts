export class LateValidationCheckInError extends Error {
  constructor() {
    super('The check-in can only be valited until 20 minutes of its created.')
  }
}
