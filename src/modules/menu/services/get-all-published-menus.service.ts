import { Menu } from "../entities";
import { MenuRepository } from "../protocols";

export type GetAllPublishedMenusRequest = void;

export type GetAllPublishedMenusResponse = Menu[];

export type GetAllPublishedMenusProviders = {
  menuRepository: MenuRepository;
};

export class GetAllPublishedMenusService {
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: GetAllPublishedMenusProviders) {
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: GetAllPublishedMenusRequest): Promise<GetAllPublishedMenusResponse> {
    const menus = await this.menuRepository.findAllPublished();
    return menus;
  }
}
