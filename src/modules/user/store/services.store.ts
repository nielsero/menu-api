import { CreateUserService, GetUserByEmailService, GetUserByIdService } from "@/modules/user/services";
import { buyUserRepository } from "@/modules/user/store";

const userRepository = buyUserRepository();
const createUserService = new CreateUserService(userRepository);
const getUserByEmailService = new GetUserByEmailService(userRepository);
const getUserByIdService = new GetUserByIdService(userRepository);
export const buyCreateUserService = () => createUserService;
export const buyGetUserByEmailService = () => getUserByEmailService;
export const buyGetUserByIdService = () => getUserByIdService;
