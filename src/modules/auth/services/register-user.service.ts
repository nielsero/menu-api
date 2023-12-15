import { CreateUserService } from "@/modules/user/services";
import { TokenProvider } from "@/modules/auth/protocols";
import { RequestValidator } from "@/shared/protocols";

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  token: string;
};

export class RegisterUserService {
  constructor(
    private readonly requestValidator: RequestValidator<RegisterUserRequest>,
    private readonly createUserService: CreateUserService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    await this.requestValidator.validate(request);
    await this.createUserService.execute(request);
    const token = await this.tokenProvider.generateToken(request.email);
    return { token };
  }
}
