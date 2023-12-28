import { User } from "@/modules/user";
import { buyUserRepository, buyUserServices } from "@/modules/user/store";

const request = { email: "john.doe@gmail.com" };

describe("FindUserByEmailService", () => {
  it("Should return null if user doesn't exist", async () => {
    const { getUserByEmailService: sut } = buyUserServices();
    const response = await sut.execute(request);
    expect(response).toBeNull();
  });

  it("Should return user if it exists", async () => {
    const { getUserByEmailService: sut } = buyUserServices();
    const repository = buyUserRepository();
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "hashed-password",
    });
    repository.add(user);
    const response = await sut.execute(request);
    expect(response).toEqual(user);
  });
});
