import {
  ZodCreateMenuRequestValidator,
  ZodDeleteMenuRequestValidator,
  ZodEditMenuRequestValidator,
  ZodGetAllMenusRequestValidator,
  ZodGetMenuValidator,
  ZodGetPublishedMenuValidator,
  ZodPublishMenuRequestValidator,
  ZodUnpublishMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import {
  CreateMenuRequest,
  DeleteMenuRequest,
  EditMenuRequest,
  GetAllMenusRequest,
  GetMenuRequest,
  GetPublishedMenuRequest,
  PublishMenuRequest,
  UnpublishMenuRequest,
} from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Store = {
  createMenuValidator: RequestValidator<CreateMenuRequest>;
  editMenuValidator: RequestValidator<EditMenuRequest>;
  deleteMenuValidator: RequestValidator<DeleteMenuRequest>;
  publishMenuValidator: RequestValidator<PublishMenuRequest>;
  unpublishMenuValidator: RequestValidator<UnpublishMenuRequest>;
  getAllMenusValidator: RequestValidator<GetAllMenusRequest>;
  getMenuValidator: RequestValidator<GetMenuRequest>;
  getPublishedMenuValidator: RequestValidator<GetPublishedMenuRequest>;
};

const createMenuValidator = new ZodCreateMenuRequestValidator();
const editMenuValidator = new ZodEditMenuRequestValidator();
const deleteMenuValidator = new ZodDeleteMenuRequestValidator();
const publishMenuValidator = new ZodPublishMenuRequestValidator();
const unpublishMenuValidator = new ZodUnpublishMenuRequestValidator();
const getAllMenusValidator = new ZodGetAllMenusRequestValidator();
const getMenuValidator = new ZodGetMenuValidator();
const getPublishedMenuValidator = new ZodGetPublishedMenuValidator();

export const buyMenuValidators = (): Store => ({
  createMenuValidator,
  editMenuValidator,
  deleteMenuValidator,
  publishMenuValidator,
  unpublishMenuValidator,
  getAllMenusValidator,
  getMenuValidator,
  getPublishedMenuValidator,
});
