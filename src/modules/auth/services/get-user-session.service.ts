import { GetUserByIdService } from "@/modules/user/services";
import { UserNotFound } from "@/shared/errors";

export type GetUserSessionRequest = {
  userId: string;
};

export type GetUserSessionResponse = {
  id: string;
  name: string;
  email: string;
};

export class GetUserSessionService {
  constructor(private readonly service: GetUserByIdService) {}

  async execute(request: GetUserSessionRequest): Promise<GetUserSessionResponse> {
    const user = await this.service.execute({ id: request.userId });
    if (!user) throw new UserNotFound();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
