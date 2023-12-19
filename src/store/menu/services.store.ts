import {
  CreateMenuService,
  DeleteMenuService,
  GetAllMenusService,
  EditMenuService,
  GetAllPublishedMenusService,
  PublishMenuService,
  UnpublishMenuService,
} from "@/modules/menu/services";
import { buyMenuRepository, buyMenuValidators } from "@/store/menu";

type Store = {
  createMenuService: CreateMenuService;
  deleteMenuService: DeleteMenuService;
  getAllMenusService: GetAllMenusService;
  editMenuService: EditMenuService;
  getAllPublishedMenusService: GetAllPublishedMenusService;
  publishMenuService: PublishMenuService;
  unpublishMenuService: UnpublishMenuService;
};

const menuRepository = buyMenuRepository();
const {
  createMenuValidator,
  deleteMenuValidator,
  getAllMenusValidator,
  editMenuValidator,
  publishMenuValidator,
  unpublishMenuValidator,
} = buyMenuValidators();
const createMenuService = new CreateMenuService({
  menuRepository,
  requestValidator: createMenuValidator,
});
const deleteMenuService = new DeleteMenuService({
  menuRepository,
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

export const buyMenuServices = (): Store => {
  return {
    createMenuService,
    deleteMenuService,
    getAllMenusService,
    editMenuService,
    getAllPublishedMenusService,
    publishMenuService,
    unpublishMenuService,
  };
};
