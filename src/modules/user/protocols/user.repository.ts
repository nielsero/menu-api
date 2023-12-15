import { User } from "@/modules/user";

export interface UserRepository {
  add(user: User): Promise<void>;
}
