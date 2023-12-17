import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService, FindUserByEmailService } from "@/modules/user/services";

export type UserTypes = {
  createUserService: CreateUserService;
  findUserByEmailService: FindUserByEmailService;
  userRepository: UserRepository;
};

export const makeUser = (): UserTypes => {
  const userRepository = new InMemoryUserRepository();
  const findUserByEmailService = new FindUserByEmailService({ userRepository });
  const createUserService = new CreateUserService({ userRepository });
  return { createUserService, findUserByEmailService, userRepository };
};
