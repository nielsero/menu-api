import { MenuRouter } from "@/modules/menu";
import { buyMenuControllers } from "@/modules/menu/store";

type Store = MenuRouter;

const menuRouter = new MenuRouter(buyMenuControllers());

export const buyMenuRouter = (): Store => menuRouter;
