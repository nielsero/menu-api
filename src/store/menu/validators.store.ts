import {
  ZodCreateMenuRequestValidator,
  ZodDeleteMenuRequestValidator,
  ZodEditMenuRequestValidator,
  ZodGetAllMenusRequestValidator,
  ZodPublishMenuRequestValidator,
  ZodUnpublishMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import {
  CreateMenuRequest,
  DeleteMenuRequest,
  EditMenuRequest,
  GetAllMenusRequest,
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
};

const createMenuValidator = new ZodCreateMenuRequestValidator();
const editMenuValidator = new ZodEditMenuRequestValidator();
const deleteMenuValidator = new ZodDeleteMenuRequestValidator();
const publishMenuValidator = new ZodPublishMenuRequestValidator();
const unpublishMenuValidator = new ZodUnpublishMenuRequestValidator();
const getAllMenusValidator = new ZodGetAllMenusRequestValidator();

export const buyMenuValidators = (): Store => ({
  createMenuValidator,
  editMenuValidator,
  deleteMenuValidator,
  publishMenuValidator,
  unpublishMenuValidator,
  getAllMenusValidator,
});
