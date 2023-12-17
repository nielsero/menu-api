export class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExists";
  }
}

export class InvalidCredentials extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentials";
  }
}

export class UserNotFound extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
  }
}
