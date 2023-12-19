import {
  AddMenuItemService,
  DeleteMenuItemService,
  GetAllMenuItemsService,
  EditMenuItemService,
  GetAllPublishedMenuItemsService,
  GetMenuItemService,
  GetPublishedMenuItemService,
} from "@/modules/menu-item/services";
import { buyMenuRepository } from "@/store/menu";
import { buyMenuItemRepository, buyMenuItemValidators } from "@/store/menu-item";

type Store = {
  addMenuItemService: AddMenuItemService;
  deleteMenuItemService: DeleteMenuItemService;
  getAllMenuItemsService: GetAllMenuItemsService;
  editMenuItemService: EditMenuItemService;
  getAllPublishedMenuItemsService: GetAllPublishedMenuItemsService;
  getMenuItemService: GetMenuItemService;
  getPublishedMenuItemService: GetPublishedMenuItemService;
};

const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();
const {
  addMenuItemValidator,
  editMenuItemValidator,
  deleteMenuItemValidator,
  getAllMenuItemsValidator,
  getAllPublishedMenuItemsValidator,
  getMenuItemValidator,
  getPublishedMenuItemValidator,
} = buyMenuItemValidators();
const addMenuItemService = new AddMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: addMenuItemValidator,
});
const deleteMenuItemService = new DeleteMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: deleteMenuItemValidator,
});
const getAllMenuItemsService = new GetAllMenuItemsService({
  menuRepository,
  menuItemRepository,
  requestValidator: getAllMenuItemsValidator,
});
const editMenuItemService = new EditMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: editMenuItemValidator,
});
const getAllPublishedMenuItemsService = new GetAllPublishedMenuItemsService({
  menuRepository,
  menuItemRepository,
  requestValidator: getAllPublishedMenuItemsValidator,
});
const getMenuItemService = new GetMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: getMenuItemValidator,
});
const getPublishedMenuItemService = new GetPublishedMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: getPublishedMenuItemValidator,
});

export const buyMenuItemServices = (): Store => {
  return {
    addMenuItemService,
    deleteMenuItemService,
    getAllMenuItemsService,
    editMenuItemService,
    getAllPublishedMenuItemsService,
    getMenuItemService,
    getPublishedMenuItemService,
  };
};
