import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";

type Store = UserRepository;

const userRepository = new InMemoryUserRepository();

export const buyUserRepository = (): Store => userRepository;
