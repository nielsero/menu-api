import { UserRepository } from "@/modules/user/protocols";
import { User } from "@/modules/user/";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async add(user: User): Promise<void> {
    const newUser = new User(user);
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    const foundUser = user ? new User(user) : null;
    return foundUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    const foundUser = user ? new User(user) : null;
    return foundUser;
  }

  async clear(): Promise<void> {
    this.users.length = 0;
  }
}
