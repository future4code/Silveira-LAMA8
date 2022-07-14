import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class Usercontroller {
  constructor(private userBusiness: UserBusiness) {}
  signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role} = req.body;
          const result: string = await this.userBusiness.signup(
            name,
            email,
            password,
            role
          );
          res.status(201).send({ result });
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
  }
   login = async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userBusiness.login(email, password);

      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
}
