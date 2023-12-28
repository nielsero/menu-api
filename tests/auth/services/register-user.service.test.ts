import { buyHashProvider, buyRegisterUserService, buyTokenProvider } from "@/modules/auth/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyRegisterUserService();
const userRepository = buyUserRepository();
const hashProvider = buyHashProvider();
const tokenProvider = buyTokenProvider();

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("RegisterUserService", () => {
  afterEach(async () => {
    await userRepository.clear();
  });

  it("Should register a user", async () => {
    const response = await sut.execute(request);
    expect(response).toEqual({ token: expect.any(String) });
  });

  it("Should correctly hash user password", async () => {
    await sut.execute(request);
    const user = await userRepository.findByEmail(request.email);
    expect(user).toBeDefined();
    expect(user?.password).not.toBe(request.password);
    const isPasswordCorrect = await hashProvider.compare(request.password, user?.password || "");
    expect(isPasswordCorrect).toBe(true);
  });

  it("Should generate a valid token", async () => {
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
    const token = response.token;
    const decodedToken = await tokenProvider.verify(token);
    expect(decodedToken).toBe(request.email);
  });

  it("Should throw an error if user already exists", async () => {
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
