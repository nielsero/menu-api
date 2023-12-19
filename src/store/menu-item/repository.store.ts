import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { InMemoryMenuItemRepository } from "@/modules/menu-item/providers/repositories";

type Store = MenuItemRepository;

const menuItemRepository = new InMemoryMenuItemRepository();

export const buyMenuItemRepository = (): Store => menuItemRepository;
