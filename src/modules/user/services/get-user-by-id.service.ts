import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type GetUserByIdRequest = {
  id: string;
};

export type GetUserByIdResponse = User | null;

export class GetUserByIdService {
  constructor(private readonly repository: UserRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    return await this.repository.findById(request.id);
  }
}
