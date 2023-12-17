import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type FindUserByEmailRequest = {
  email: string;
};

export type FindUserByEmailResponse = User | null;

export type FindUserByEmailProviders = {
  userRepository: UserRepository;
};

export class FindUserByEmailService {
  private readonly userRepository: UserRepository;
  constructor(private readonly providers: FindUserByEmailProviders) {
    this.userRepository = providers.userRepository;
  }

  async execute(request: FindUserByEmailRequest): Promise<FindUserByEmailResponse> {
    return await this.userRepository.findByEmail(request.email);
  }
}
