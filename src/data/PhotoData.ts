import { CustomError } from "../error/CustomError";
import { PhotoInputDTO, PhotoOutputDTO } from "../model/Photo";
import { BaseData } from "./BaseData";

export class PhotoData extends BaseData{
    public async getPhotos (id:PhotoInputDTO):Promise<PhotoOutputDTO[]> {
        try {
            const results = await PhotoData 
                .connection(`NOME_TABELAS_PHOTO`)
                .select("photo")
                .where({id})
            return results[0];
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }
}
