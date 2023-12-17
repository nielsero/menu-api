import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { FindUserByIdService } from "@/modules/user/services";
import { MenuNotFound, UserNotFound } from "@/shared/errors";

export type DeleteMenuRequest = {
  id: string;
  userId: string;
};

export type DeleteMenuResponse = void;

export type DeleteMenuProviders = {
  requestValidator: RequestValidator<DeleteMenuRequest>;
  findUserByIdService: FindUserByIdService;
  menuRepository: MenuRepository;
};

export class DeleteMenuService {
  private readonly requestValidator: RequestValidator<DeleteMenuRequest>;
  private readonly findUserByIdService: FindUserByIdService;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: DeleteMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.findUserByIdService = providers.findUserByIdService;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: DeleteMenuRequest): Promise<DeleteMenuResponse> {
    await this.requestValidator.validate(request);
    const user = await this.findUserByIdService.execute({ id: request.userId });
    if (!user) throw new UserNotFound();
    const menus = await this.menuRepository.findAllByUser(user.id);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    await this.menuRepository.delete(menu.id);
  }
}
