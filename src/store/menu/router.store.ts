import { MenuRouter } from "@/modules/menu";
import { buyMenuControllers } from "@/store/menu";

type Store = MenuRouter;

const menuRouter = new MenuRouter(buyMenuControllers());

export const buyMenuRouter = (): Store => menuRouter;
