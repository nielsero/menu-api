import { NODE_ENV } from "@/config/constants";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { InMemoryMenuItemRepository } from "@/modules/menu-item/providers/repositories";
import { MongoMenuItemRepository } from "@/modules/menu-item/providers/repositories/mongo";

// Build
const inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
const mongoMenuItemRepository = new MongoMenuItemRepository();
const menuItemRepository = NODE_ENV === "test" ? inMemoryMenuItemRepository : mongoMenuItemRepository;

// Export
export const buyMenuItemRepository = (): MenuItemRepository => menuItemRepository;
