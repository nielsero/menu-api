import { buyAuthProviders, buyAuthServices } from "@/store/auth";
import { buyUserRepository } from "@/store/user";

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("RegisterUserService", () => {
  afterEach(async () => {
    const userRepository = buyUserRepository();
    await userRepository.clear();
  });

  it("Should register a user if request is valid", async () => {
    const { registerUserService: sut } = buyAuthServices();
    const response = await sut.execute(request);
    expect(response).toEqual({ token: expect.any(String) });
  });

  it("Should throw an error if request is invalid", async () => {
    const { registerUserService: sut } = buyAuthServices();
    const nameTooShortRequest = {
      name: "Jo",
      email: "john.doe@gmail.com",
      password: "password",
    };
    const invalidEmailRequest = {
      name: "John Doe",
      email: "john.doe",
      password: "password",
    };
    const passwordTooShortRequest = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "pass",
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
    await expect(sut.execute(invalidEmailRequest)).rejects.toThrow();
    await expect(sut.execute(passwordTooShortRequest)).rejects.toThrow();
  });

  it("Should correctly hash user password", async () => {
    const { registerUserService: sut } = buyAuthServices();
    const { hashProvider } = buyAuthProviders();
    const userRepository = buyUserRepository();
    await sut.execute(request);
    const user = await userRepository.findByEmail(request.email);
    expect(user).toBeDefined();
    expect(user?.password).not.toBe(request.password);
    const isPasswordCorrect = await hashProvider.compare(request.password, user?.password || "");
    expect(isPasswordCorrect).toBe(true);
  });

  it("Should generate a valid token", async () => {
    const { registerUserService: sut } = buyAuthServices();
    const { tokenProvider } = buyAuthProviders();
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
    const token = response.token;
    const decodedToken = await tokenProvider.verify(token);
    expect(decodedToken).toBe(request.email);
  });

  it("Should throw an error if user already exists", async () => {
    const { registerUserService: sut } = buyAuthServices();
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
