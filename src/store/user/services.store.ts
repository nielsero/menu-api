import { CreateUserService, GetUserByEmailService } from "@/modules/user/services";
import { buyUserRepository } from "./repository.store";

type Store = {
  createUserService: CreateUserService;
  getUserByEmailService: GetUserByEmailService;
};

const userRepository = buyUserRepository();
const createUserService = new CreateUserService({ userRepository });
const getUserByEmailService = new GetUserByEmailService({ userRepository });

export const buyUserServices = (): Store => {
  return {
    createUserService,
    getUserByEmailService,
  };
};
