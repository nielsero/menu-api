import { Menu } from "@/modules/menu";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";

export type GetPublishedMenuRequest = {
  id: string;
};

export type GetPublishedMenuResponse = Menu;

export class GetPublishedMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: GetPublishedMenuRequest): Promise<GetPublishedMenuResponse> {
    const menu = await this.repository.findPublishedById(request.id);
    if (!menu) throw new MenuNotFound();
    return menu;
  }
}
