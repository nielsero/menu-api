import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { FindUserByIdService } from "@/modules/user/services";
import { DuplicateMenuName, UserNotFound } from "@/shared/errors";

export type EditMenuRequest = {
  id: string;
  name?: string;
  description?: string;
  userId: string;
};

export type EditMenuResponse = void;

export type EditMenuProviders = {
  requestValidator: RequestValidator<EditMenuRequest>;
  findUserByIdService: FindUserByIdService;
  menuRepository: MenuRepository;
};

export class EditMenuService {
  private readonly requestValidator: RequestValidator<EditMenuRequest>;
  private readonly findUserByIdService: FindUserByIdService;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: EditMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.findUserByIdService = providers.findUserByIdService;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: EditMenuRequest): Promise<EditMenuResponse> {
    await this.requestValidator.validate(request);
    const user = await this.findUserByIdService.execute({ id: request.userId });
    if (!user) throw new UserNotFound();
    const menus = await this.menuRepository.findAllByUser(user.id);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new Error("Menu not found");
    const isNameAlreadyTaken = menus.some((menu) => menu.name === request.name);
    if (isNameAlreadyTaken) throw new DuplicateMenuName();
    if (request.name) menu.name = request.name;
    if (request.description) menu.description = request.description;
    await this.menuRepository.update(menu);
  }
}
