import { hash, compare } from "bcrypt";

export class Password {
  static async hashPassword(password: string) {
    const hashedPassword = await hash(password, 8);
    return hashedPassword;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const isTheSamePassword = await compare(suppliedPassword, storedPassword);
    return isTheSamePassword;
  }
}
