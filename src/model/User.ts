import { CustomError } from "../error/CustomError";

export enum ROLE {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: ROLE
  ) {}

  getId = (): string => {
    return this.id;
  };
  getName = (): string => {
    return this.name;
  };
  getEmail = (): string => {
    return this.email;
  };
  getPassword = (): string => {
    return this.password;
  };
  getRole = (): ROLE => {
    return this.role;
  };

  static toUserModel(data: any): User {
    return new User(data.id, data.name, data.email, data.password, data.role);
  }
}
export const stringToUserRole = (input: string): ROLE => {
  switch (input) {
    case "NORMAL":
      return ROLE.NORMAL;
    case "ADMIN":
      return ROLE.ADMIN;
    default:
      throw new CustomError(422, "Invalid user role");
  }
};
