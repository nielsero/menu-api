import { MenuItemRouter } from "@/modules/menu-item";
import { buyMenuItemControllers } from "@/store/menu-item";

type Store = MenuItemRouter;

const menuItemRouter = new MenuItemRouter(buyMenuItemControllers());

export const buyMenuItemRouter = (): Store => menuItemRouter;
