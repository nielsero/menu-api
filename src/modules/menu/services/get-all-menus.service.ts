import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu/entities";

export type GetAllMenusRequest = {
  userId: string;
};

export type GetAllMenusResponse = Menu[];

export type GetAllMenusProviders = {
  requestValidator: RequestValidator<GetAllMenusRequest>;
  menuRepository: MenuRepository;
};

export class GetAllMenusService {
  private readonly requestValidator: RequestValidator<GetAllMenusRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: GetAllMenusProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: GetAllMenusRequest): Promise<GetAllMenusResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    return menus;
  }
}
