import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

export type GetUserByEmailRequest = {
  email: string;
};

export type GetUserByEmailResponse = User | null;

export class GetUserByEmailService {
  constructor(private readonly repository: UserRepository) {}

  async execute(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
    return await this.repository.findByEmail(request.email);
  }
}
