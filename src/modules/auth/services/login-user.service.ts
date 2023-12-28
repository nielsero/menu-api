import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { GetUserByEmailService } from "@/modules/user/services";
import { InvalidCredentials } from "@/shared/errors";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
};

type Providers = {
  hashProvider: HashProvider;
  getUserByEmailService: GetUserByEmailService;
  tokenProvider: TokenProvider;
};

export class LoginUserService {
  private readonly hashProvider: HashProvider;
  private readonly getUserByEmailService: GetUserByEmailService;
  private readonly tokenProvider: TokenProvider;

  constructor(private readonly providers: Providers) {
    this.hashProvider = providers.hashProvider;
    this.getUserByEmailService = providers.getUserByEmailService;
    this.tokenProvider = providers.tokenProvider;
  }

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.getUserByEmailService.execute({ email: request.email });
    if (!user) throw new InvalidCredentials();
    const isPasswordValid = await this.hashProvider.compare(request.password, user.password);
    if (!isPasswordValid) throw new InvalidCredentials();
    const token = await this.tokenProvider.generate(request.email);
    return { token };
  }
}
