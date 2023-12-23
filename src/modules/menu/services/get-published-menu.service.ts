import { RequestValidator } from "@/shared/protocols";
import { Menu } from "../menu.entity";
import { MenuRepository } from "../protocols";
import { MenuNotFound } from "@/shared/errors";

export type GetPublishedMenuRequest = {
  id: string;
};

export type GetPublishedMenuResponse = Menu;

export type GetPublishedMenuProviders = {
  requestValidator: RequestValidator<GetPublishedMenuRequest>;
  menuRepository: MenuRepository;
};

export class GetPublishedMenuService {
  private readonly requestValidator: RequestValidator<GetPublishedMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: GetPublishedMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: GetPublishedMenuRequest): Promise<GetPublishedMenuResponse> {
    await this.requestValidator.validate(request);
    const menu = await this.menuRepository.findPublishedById(request.id);
    if (!menu) throw new MenuNotFound();
    return menu;
  }
}
