import { GetUserByIdService } from "@/modules/user/services";
import { UserNotFound } from "@/shared/errors";

export type GetUserSessionRequest = {
  id: string;
};

export type GetUserSessionResponse = {
  id: string;
  name: string;
  email: string;
};

export type GetUserSessionProviders = {
  getUserByIdService: GetUserByIdService;
};

export class GetUserSessionService {
  private readonly getUserByIdService: GetUserByIdService;

  constructor(private readonly providers: GetUserSessionProviders) {
    this.getUserByIdService = providers.getUserByIdService;
  }

  async execute(request: GetUserSessionRequest): Promise<GetUserSessionResponse> {
    const user = await this.getUserByIdService.execute({ id: request.id });
    if (!user) throw new UserNotFound();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
