import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type FindUserByEmailRequest = {
  email: string;
};

export type FindUserByEmailResponse = User | null;

export class FindUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: FindUserByEmailRequest): Promise<FindUserByEmailResponse> {
    return await this.userRepository.findByEmail(request.email);
  }
}
