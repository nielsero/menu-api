import { NODE_ENV } from "@/config/constants";
import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import { MongoMenuRepository } from "@/modules/menu/providers/repositories/mongo";

// Build
const inMemoryMenuRepository = new InMemoryMenuRepository();
const mongoMenuRepository = new MongoMenuRepository();
const menuRepository = NODE_ENV === "test" ? inMemoryMenuRepository : mongoMenuRepository;

// Export
export const buyMenuRepository = (): MenuRepository => menuRepository;
