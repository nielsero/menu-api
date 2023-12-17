import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type FindUserByIdRequest = {
  id: string;
};

export type FindUserByIdResponse = User | null;

export type FindUserByIdProviders = {
  userRepository: UserRepository;
};

export class FindUserByIdService {
  private readonly userRepository: UserRepository;

  constructor(private readonly providers: FindUserByIdProviders) {
    this.userRepository = providers.userRepository;
  }

  async execute(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    return await this.userRepository.findById(request.id);
  }
}
