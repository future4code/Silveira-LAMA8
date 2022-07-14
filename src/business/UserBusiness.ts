import { UserData } from "../data/UserData";
import { CustomError } from "../error/CustomError";
import { stringToUserRole, User } from "../model/User";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class UserBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private userData: UserData
  ) {}
  public async signup(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    console.log("entrei aqui no business")
    try {
      if (!name || !email || !password || !role) {
        throw new CustomError(422, "Missing input");
      }
      if (password.length < 6) {
        throw new CustomError(422, "Invalid password");
      }
      if (!email.includes("@") || !email.includes(".com")) {
        throw new CustomError(422, "Invalid email");
      }
      
      const user = await this.userData.findUserByEmail(email);

      if (user) {
        throw new CustomError(401, "Invalid credentials");
      }
      const id = this.idGenerator.generate();
      const cypherPassword = await this.hashGenerator.hash(password);

      const newUser = new User(id, name, email, cypherPassword, stringToUserRole(role))
      await this.userData.createUser(newUser);

      const acessToken = this.tokenGenerator.generate({
        id,
        role
      });
      return acessToken ;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new CustomError(422, "Missing input");
      }
      const user = await this.userData.findUserByEmail(email);

      if (!user) {
        throw new CustomError(400, "User already created");
      }

      const passwordIsCorrect = this.hashGenerator.compareHash(
        password,
        user.getPassword()
      );

      if (!passwordIsCorrect) {
        throw new CustomError(401, "Invalid credentials");
      }

      const accessToken = this.tokenGenerator.generate({
        id: user.getId(),
        role: user.getRole(),
      });

      return { accessToken };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
