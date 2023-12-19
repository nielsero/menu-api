export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

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

export class DuplicateMenuName extends Error {
  constructor() {
    super("Duplicate menu name");
    this.name = "DuplicateMenuName";
  }
}

export class MenuNotFound extends Error {
  constructor() {
    super("Menu not found");
    this.name = "MenuNotFound";
  }
}

export class DuplicateMenuItemName extends Error {
  constructor() {
    super("Duplicate menu item name");
    this.name = "DuplicateMenuItemName";
  }
}

export class MenuItemNotFound extends Error {
  constructor() {
    super("Menu item not found");
    this.name = "MenuItemNotFound";
  }
}
