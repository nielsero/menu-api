import { RequestValidator } from "@/shared/protocols";
import { TokenProvider } from "../protocols";
import { GetUserByEmailService } from "@/modules/user/services";
import { UserNotFound } from "@/shared/errors";

export type GetUserSessionRequest = {
  token: string;
};

export type GetUserSessionResponse = {
  id: string;
  name: string;
  email: string;
};

export type GetUserSessionProviders = {
  requestValidator: RequestValidator<GetUserSessionRequest>;
  tokenProvider: TokenProvider;
  getUserByEmailService: GetUserByEmailService;
};

export class GetUserSessionService {
  private readonly requestValidator: RequestValidator<GetUserSessionRequest>;
  private readonly tokenProvider: TokenProvider;
  private readonly getUserByEmailService: GetUserByEmailService;

  constructor(private readonly providers: GetUserSessionProviders) {
    this.requestValidator = providers.requestValidator;
    this.tokenProvider = providers.tokenProvider;
    this.getUserByEmailService = providers.getUserByEmailService;
  }

  async execute(request: GetUserSessionRequest): Promise<GetUserSessionResponse> {
    await this.requestValidator.validate(request);
    const email = await this.tokenProvider.verify(request.token);
    const user = await this.getUserByEmailService.execute({ email });
    if (!user) throw new UserNotFound();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
