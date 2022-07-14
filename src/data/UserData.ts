import { CustomError } from "../error/CustomError";
import { User } from "../model/User";
import { BaseData } from "./BaseData";

export class UserData extends BaseData{
    protected tableName:string = "NOME_TABELAS_USUÁRIOS"

    public async createUser(user:User) : Promise<void>{
        // console.log(user)
        try {
            await BaseData.connection(this.tableName).insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })
        } catch (error:any) {

            throw new CustomError(400, error.sqlMessage);

        }
    }

    public async findUserByEmail(email:string) : Promise<User | undefined>{

        try {
           const user = await BaseData.connection(this.tableName).select("*")
            .where({email: email})
            return user[0] && User.toUserModel(user[0])

        }   
        catch (error:any) {
            console.log(error)
            throw new CustomError(400, error.sqlMessage);

        }
    }

} 