import {
  CreateMenuController,
  DeleteMenuController,
  GetAllMenusController,
  EditMenuController,
  GetAllPublishedMenusController,
  PublishMenuController,
  UnpublishMenuController,
} from "@/modules/menu/controllers";
import { buyMenuServices } from "@/store/menu";

type Store = {
  createMenuController: CreateMenuController;
  deleteMenuController: DeleteMenuController;
  getAllMenusController: GetAllMenusController;
  editMenuController: EditMenuController;
  getAllPublishedMenusController: GetAllPublishedMenusController;
  publishMenuController: PublishMenuController;
  unpublishMenuController: UnpublishMenuController;
};

const {
  createMenuService,
  deleteMenuService,
  getAllMenusService,
  editMenuService,
  getAllPublishedMenusService,
  publishMenuService,
  unpublishMenuService,
} = buyMenuServices();
const createMenuController = new CreateMenuController(createMenuService);
const deleteMenuController = new DeleteMenuController(deleteMenuService);
const getAllMenusController = new GetAllMenusController(getAllMenusService);
const editMenuController = new EditMenuController(editMenuService);
const getAllPublishedMenusController = new GetAllPublishedMenusController(getAllPublishedMenusService);
const publishMenuController = new PublishMenuController(publishMenuService);
const unpublishMenuController = new UnpublishMenuController(unpublishMenuService);

export const buyMenuControllers = (): Store => {
  return {
    createMenuController,
    deleteMenuController,
    getAllMenusController,
    editMenuController,
    getAllPublishedMenusController,
    publishMenuController,
    unpublishMenuController,
  };
};
