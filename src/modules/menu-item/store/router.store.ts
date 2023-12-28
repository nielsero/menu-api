import { MenuItemRouter } from "@/modules/menu-item";
import { buyMenuItemControllers } from "@/modules/menu-item/store";

type Store = MenuItemRouter;

const menuItemRouter = new MenuItemRouter(buyMenuItemControllers());

export const buyMenuItemRouter = (): Store => menuItemRouter;
