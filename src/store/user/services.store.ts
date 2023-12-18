import { CreateUserService, FindUserByEmailService } from "@/modules/user/services";
import { buyUserRepository } from "./repository.store";

type Store = {
  createUserService: CreateUserService;
  findUserByEmailService: FindUserByEmailService;
};

const userRepository = buyUserRepository();
const createUserService = new CreateUserService({ userRepository });
const findUserByEmailService = new FindUserByEmailService({ userRepository });

export const buyUserServices = (): Store => {
  return {
    createUserService,
    findUserByEmailService,
  };
};
