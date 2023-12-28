import { NODE_ENV } from "@/config/constants";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { InMemoryMenuItemRepository } from "@/modules/menu-item/providers/repositories";
import { MongoMenuItemRepository } from "@/modules/menu-item/providers/repositories/mongo";

type Store = MenuItemRepository;

const inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
const mongoMenuItemRepository = new MongoMenuItemRepository();
const menuItemRepository = NODE_ENV === "test" ? inMemoryMenuItemRepository : mongoMenuItemRepository;

export const buyMenuItemRepository = (): Store => menuItemRepository;
