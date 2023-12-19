import { NODE_ENV } from "@/config";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { MongoUserRepository } from "@/modules/user/providers/repositories/mongo";

type Store = UserRepository;

const inMemoryUserRepository = new InMemoryUserRepository();
const mongoUserRepository = new MongoUserRepository();
const userRepository = NODE_ENV === "test" ? inMemoryUserRepository : mongoUserRepository;

export const buyUserRepository = (): Store => userRepository;
