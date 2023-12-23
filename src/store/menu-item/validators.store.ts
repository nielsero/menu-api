import {
  AddMenuItemRequest,
  DeleteMenuItemRequest,
  EditMenuItemRequest,
  GetAllMenuItemsRequest,
  GetAllPublishedMenuItemsRequest,
  GetMenuItemRequest,
  GetPublishedMenuItemRequest,
} from "@/modules/menu-item/services";
import {
  ZodAddMenuItemRequestValidator,
  ZodEditMenuItemRequestValidator,
  ZodDeleteMenuItemRequestValidator,
  ZodGetAllMenuItemsRequestValidator,
  ZodGetAllPublishedMenuItemsRequestValidator,
  ZodGetMenuItemRequestValidator,
  ZodGetPublishedMenuItemRequestValidator,
} from "@/modules/menu-item/providers/validators";
import { RequestValidator } from "@/shared/protocols";

type Store = {
  addMenuItemValidator: RequestValidator<AddMenuItemRequest>;
  editMenuItemValidator: RequestValidator<EditMenuItemRequest>;
  deleteMenuItemValidator: RequestValidator<DeleteMenuItemRequest>;
  getAllMenuItemsValidator: RequestValidator<GetAllMenuItemsRequest>;
  getAllPublishedMenuItemsValidator: RequestValidator<GetAllPublishedMenuItemsRequest>;
  getMenuItemValidator: RequestValidator<GetMenuItemRequest>;
  getPublishedMenuItemValidator: RequestValidator<GetPublishedMenuItemRequest>;
};

const addMenuItemValidator = new ZodAddMenuItemRequestValidator();
const editMenuItemValidator = new ZodEditMenuItemRequestValidator();
const deleteMenuItemValidator = new ZodDeleteMenuItemRequestValidator();
const getAllMenuItemsValidator = new ZodGetAllMenuItemsRequestValidator();
const getAllPublishedMenuItemsValidator = new ZodGetAllPublishedMenuItemsRequestValidator();
const getMenuItemValidator = new ZodGetMenuItemRequestValidator();
const getPublishedMenuItemValidator = new ZodGetPublishedMenuItemRequestValidator();

export const buyMenuItemValidators = (): Store => ({
  addMenuItemValidator,
  editMenuItemValidator,
  deleteMenuItemValidator,
  getAllMenuItemsValidator,
  getAllPublishedMenuItemsValidator,
  getMenuItemValidator,
  getPublishedMenuItemValidator,
});
