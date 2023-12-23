import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type GetUserByEmailRequest = {
  email: string;
};

export type GetUserByEmailResponse = User | null;

export type GetUserByEmailProviders = {
  userRepository: UserRepository;
};

export class GetUserByEmailService {
  private readonly userRepository: UserRepository;

  constructor(private readonly providers: GetUserByEmailProviders) {
    this.userRepository = providers.userRepository;
  }

  async execute(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
    return await this.userRepository.findByEmail(request.email);
  }
}
