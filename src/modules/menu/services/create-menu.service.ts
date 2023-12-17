import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu/entities";

export type CreateMenuRequest = {
  name: string;
  description?: string;
  userId: string;
};

export type CreateMenuResponse = void;

export type CreateMenuProviders = {
  requestValidator: RequestValidator<CreateMenuRequest>;
  menuRepository: MenuRepository;
};

export class CreateMenuService {
  private readonly requestValidator: RequestValidator<CreateMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: CreateMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: CreateMenuRequest): Promise<CreateMenuResponse> {
    await this.requestValidator.validate(request);
    const menu = new Menu(request);
    await this.menuRepository.add(menu);
  }
}
