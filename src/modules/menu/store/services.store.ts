import {
  CreateMenuService,
  DeleteMenuService,
  GetAllMenusService,
  EditMenuService,
  GetAllPublishedMenusService,
  PublishMenuService,
  UnpublishMenuService,
  GetMenuService,
  GetPublishedMenuService,
} from "@/modules/menu/services";
import { buyMenuRepository, buyMenuValidators } from "@/modules/menu/store";
import { buyMenuItemRepository } from "../../menu-item/store";

type Store = {
  createMenuService: CreateMenuService;
  deleteMenuService: DeleteMenuService;
  getAllMenusService: GetAllMenusService;
  editMenuService: EditMenuService;
  getAllPublishedMenusService: GetAllPublishedMenusService;
  publishMenuService: PublishMenuService;
  unpublishMenuService: UnpublishMenuService;
  getMenuService: GetMenuService;
  getPublishedMenuService: GetPublishedMenuService;
};

const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();
const {
  createMenuValidator,
  deleteMenuValidator,
  getAllMenusValidator,
  editMenuValidator,
  publishMenuValidator,
  unpublishMenuValidator,
  getMenuValidator,
  getPublishedMenuValidator,
} = buyMenuValidators();
const createMenuService = new CreateMenuService({
  menuRepository,
  requestValidator: createMenuValidator,
});
const deleteMenuService = new DeleteMenuService({
  menuRepository,
  menuItemRepository,
  requestValidator: deleteMenuValidator,
});
const getAllMenusService = new GetAllMenusService({
  menuRepository,
  requestValidator: getAllMenusValidator,
});
const editMenuService = new EditMenuService({
  menuRepository,
  requestValidator: editMenuValidator,
});
const getAllPublishedMenusService = new GetAllPublishedMenusService({
  menuRepository,
});
const publishMenuService = new PublishMenuService({
  menuRepository,
  requestValidator: publishMenuValidator,
});
const unpublishMenuService = new UnpublishMenuService({
  menuRepository,
  requestValidator: unpublishMenuValidator,
});
const getMenuService = new GetMenuService({
  menuRepository,
  requestValidator: getMenuValidator,
});
const getPublishedMenuService = new GetPublishedMenuService({
  menuRepository,
  requestValidator: getPublishedMenuValidator,
});

export const buyMenuServices = (): Store => {
  return {
    createMenuService,
    deleteMenuService,
    getAllMenusService,
    editMenuService,
    getAllPublishedMenusService,
    publishMenuService,
    unpublishMenuService,
    getMenuService,
    getPublishedMenuService,
  };
};
