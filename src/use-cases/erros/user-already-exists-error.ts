export class UserAlreadyExisisError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
