import { NODE_ENV } from "@/config/constants";
import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import { MongoMenuRepository } from "@/modules/menu/providers/repositories/mongo";

const inMemoryMenuRepository = new InMemoryMenuRepository();
const mongoMenuRepository = new MongoMenuRepository();
const menuRepository = NODE_ENV === "test" ? inMemoryMenuRepository : mongoMenuRepository;
export const buyMenuRepository = (): MenuRepository => menuRepository;
