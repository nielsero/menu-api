import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu/entities";
import { FindUserByIdService } from "@/modules/user/services";
import { DuplicateMenuName, UserNotFound } from "@/shared/errors";

export type CreateMenuRequest = {
  name: string;
  description?: string;
  userId: string;
};

export type CreateMenuResponse = void;

export type CreateMenuProviders = {
  requestValidator: RequestValidator<CreateMenuRequest>;
  findUserByIdService: FindUserByIdService;
  menuRepository: MenuRepository;
};

export class CreateMenuService {
  private readonly requestValidator: RequestValidator<CreateMenuRequest>;
  private readonly findUserByIdService: FindUserByIdService;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: CreateMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.findUserByIdService = providers.findUserByIdService;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: CreateMenuRequest): Promise<CreateMenuResponse> {
    await this.requestValidator.validate(request);
    const user = await this.findUserByIdService.execute({ id: request.userId });
    if (!user) throw new UserNotFound();
    const menus = await this.menuRepository.findAllByUser(user.id);
    const menuAlreadyExists = menus.some((menu) => menu.name === request.name);
    if (menuAlreadyExists) throw new DuplicateMenuName();
    const menu = new Menu(request);
    await this.menuRepository.add(menu);
  }
}
