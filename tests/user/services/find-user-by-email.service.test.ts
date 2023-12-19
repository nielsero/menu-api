import { User } from "@/modules/user";
import { buyUserRepository, buyUserServices } from "@/store/user";

const request = { email: "john.doe@gmail.com" };

describe("FindUserByEmailService", () => {
  it("Should return null if user doesn't exist", async () => {
    const { findUserByEmailService: sut } = buyUserServices();
    const response = await sut.execute(request);
    expect(response).toBeNull();
  });

  it("Should return user if it exists", async () => {
    const { findUserByEmailService: sut } = buyUserServices();
    const repository = buyUserRepository();
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });
    repository.add(user);
    const response = await sut.execute(request);
    expect(response).toEqual(user);
  });
});
