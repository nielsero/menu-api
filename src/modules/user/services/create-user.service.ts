import { UserRepository } from "@/modules/user/protocols";
import { User } from "@/modules/user";
import { UserAlreadyExists } from "@/shared/errors";

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  constructor(private readonly repository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const user = new User(request);
    const userExists = await this.repository.findByEmail(user.email);
    if (userExists) throw new UserAlreadyExists();
    await this.repository.add(user);
  }
}
