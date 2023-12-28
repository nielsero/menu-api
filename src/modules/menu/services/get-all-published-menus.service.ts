import { Menu } from "@/modules/menu";
import { MenuRepository } from "@/modules/menu/protocols";

export type GetAllPublishedMenusResponse = Menu[];

export class GetAllPublishedMenusService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(): Promise<GetAllPublishedMenusResponse> {
    const menus = await this.repository.findAllPublished();
    return menus;
  }
}
