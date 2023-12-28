import { User } from "@/modules/user";
import { buyHashProvider, buyLoginUserService, buyTokenProvider } from "@/modules/auth/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyLoginUserService();
const userRepository = buyUserRepository();
const hashProvider = buyHashProvider();
const tokenProvider = buyTokenProvider();

const request = {
  email: "john.doe@gmail.com",
  password: "password",
};

describe("LoginUserService", () => {
  afterEach(async () => {
    await userRepository.clear();
  });

  it("Should login a user if he's already registered", async () => {
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
  });

  it("Should throw an error if user is not found", async () => {
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw an error if password is incorrect", async () => {
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const incorrectPasswordRequest = {
      email: "john.doe@gmail.com",
      password: "not-password",
    };
    await expect(sut.execute(incorrectPasswordRequest)).rejects.toThrow();
  });

  it("Should generate a valid token", async () => {
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const response = await sut.execute(request);
    const token = response.token;
    const decodedToken = await tokenProvider.verify(token);
    expect(response.token).toBeDefined();
    expect(decodedToken).toBe(request.email);
  });
});
