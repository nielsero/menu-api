import { NODE_ENV } from "@/config";
import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import { MongoMenuRepository } from "@/modules/menu/providers/repositories/mongo";

type Store = MenuRepository;

const inMemoryMenuRepository = new InMemoryMenuRepository();
const mongoMenuRepository = new MongoMenuRepository();
const menuRepository = NODE_ENV === "test" ? inMemoryMenuRepository : mongoMenuRepository;

export const buyMenuRepository = (): Store => menuRepository;
