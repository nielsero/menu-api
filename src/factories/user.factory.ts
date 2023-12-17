import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService, FindUserByEmailService, FindUserByIdService } from "@/modules/user/services";

export type UserTypes = {
  createUserService: CreateUserService;
  findUserByEmailService: FindUserByEmailService;
  findUserByIdService: FindUserByIdService;
  userRepository: UserRepository;
};

const inMemoryUserRepository = new InMemoryUserRepository();

export const makeUser = (): UserTypes => {
  const findUserByEmailService = new FindUserByEmailService({ userRepository: inMemoryUserRepository });
  const findUserByIdService = new FindUserByIdService({ userRepository: inMemoryUserRepository });
  const createUserService = new CreateUserService({ userRepository: inMemoryUserRepository });
  return {
    createUserService,
    findUserByEmailService,
    findUserByIdService,
    userRepository: inMemoryUserRepository,
  };
};
