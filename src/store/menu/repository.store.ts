import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";

type Store = MenuRepository;

const menuRepository = new InMemoryMenuRepository();

export const buyMenuRepository = (): Store => menuRepository;
