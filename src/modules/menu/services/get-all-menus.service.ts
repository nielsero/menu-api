import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu";

export type GetAllMenusRequest = {
  userId: string;
};

export type GetAllMenusResponse = Menu[];

export class GetAllMenusService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: GetAllMenusRequest): Promise<GetAllMenusResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    return menus;
  }
}
