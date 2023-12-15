import { UserRepository } from "@/modules/user/protocols";
import { User } from "@/modules/user";

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserResponse = void;

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User(request);
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) throw new Error("User already exists");
    await this.userRepository.add(user);
  }
}
