import {
  AddMenuItemController,
  DeleteMenuItemController,
  GetAllMenuItemsController,
  EditMenuItemController,
  GetAllPublishedMenuItemsController,
  GetMenuItemController,
  GetPublishedMenuItemController,
} from "@/modules/menu-item/controllers";
import { buyMenuItemServices } from "@/modules/menu-item/store";

type Store = {
  addMenuItemController: AddMenuItemController;
  deleteMenuItemController: DeleteMenuItemController;
  getAllMenuItemsController: GetAllMenuItemsController;
  editMenuItemController: EditMenuItemController;
  getAllPublishedMenuItemsController: GetAllPublishedMenuItemsController;
  getMenuItemController: GetMenuItemController;
  getPublishedMenuItemController: GetPublishedMenuItemController;
};

const {
  addMenuItemService,
  deleteMenuItemService,
  getAllMenuItemsService,
  editMenuItemService,
  getAllPublishedMenuItemsService,
  getMenuItemService,
  getPublishedMenuItemService,
} = buyMenuItemServices();

const addMenuItemController = new AddMenuItemController(addMenuItemService);
const deleteMenuItemController = new DeleteMenuItemController(deleteMenuItemService);
const getAllMenuItemsController = new GetAllMenuItemsController(getAllMenuItemsService);
const editMenuItemController = new EditMenuItemController(editMenuItemService);
const getAllPublishedMenuItemsController = new GetAllPublishedMenuItemsController(
  getAllPublishedMenuItemsService,
);
const getMenuItemController = new GetMenuItemController(getMenuItemService);
const getPublishedMenuItemController = new GetPublishedMenuItemController(getPublishedMenuItemService);

export const buyMenuItemControllers = (): Store => {
  return {
    addMenuItemController,
    deleteMenuItemController,
    getAllMenuItemsController,
    editMenuItemController,
    getAllPublishedMenuItemsController,
    getMenuItemController,
    getPublishedMenuItemController,
  };
};
