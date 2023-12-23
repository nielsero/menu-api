import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type GetUserByIdRequest = {
  id: string;
};

export type GetUserByIdResponse = User | null;

export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    return await this.userRepository.findById(request.id);
  }
}
