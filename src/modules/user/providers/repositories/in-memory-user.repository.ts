import { UserRepository } from "@/modules/user/protocols";
import { User } from "@/modules/user/";

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async add(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
