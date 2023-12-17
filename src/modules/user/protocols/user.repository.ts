import { User } from "@/modules/user";

export interface UserRepository {
  add(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  clear(): Promise<void>;
}
