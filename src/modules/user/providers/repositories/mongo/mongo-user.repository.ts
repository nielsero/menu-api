import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { UserModel } from "@/modules/user/providers/repositories/mongo";

export class MongoUserRepository implements UserRepository {
  async add(user: User): Promise<void> {
    await UserModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    const foundUser = new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return foundUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id });
    if (!user) return null;
    const foundUser = new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return foundUser;
  }

  async clear(): Promise<void> {
    await UserModel.deleteMany({});
  }
}
