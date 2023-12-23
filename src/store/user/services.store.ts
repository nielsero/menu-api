import { CreateUserService, GetUserByEmailService, GetUserByIdService } from "@/modules/user/services";
import { buyUserRepository } from "./repository.store";

type Store = {
  createUserService: CreateUserService;
  getUserByEmailService: GetUserByEmailService;
  getUserByIdService: GetUserByIdService;
};

const userRepository = buyUserRepository();
const createUserService = new CreateUserService({ userRepository });
const getUserByEmailService = new GetUserByEmailService({ userRepository });
const getUserByIdService = new GetUserByIdService(userRepository);

export const buyUserServices = (): Store => {
  return {
    createUserService,
    getUserByEmailService,
    getUserByIdService,
  };
};
