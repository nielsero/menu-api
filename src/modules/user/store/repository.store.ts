import { NODE_ENV } from "@/config/constants";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { MongoUserRepository } from "@/modules/user/providers/repositories/mongo";

// Build
const inMemoryUserRepository = new InMemoryUserRepository();
const mongoUserRepository = new MongoUserRepository();
const userRepository = NODE_ENV === "test" ? inMemoryUserRepository : mongoUserRepository;

// Export
export const buyUserRepository = (): UserRepository => userRepository;
