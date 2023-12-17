import { UserRepository } from "@/modules/user/protocols";
import { User } from "@/modules/user/";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async add(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async clear(): Promise<void> {
    this.users.length = 0;
  }
}
