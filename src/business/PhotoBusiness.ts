import { PhotoData } from "../data/PhotoData";
import { CustomError } from "../error/CustomError";
import { PhotoInputDTO, PhotoOutputDTO } from "../model/Photo";

export class PhotoBusiness {
       getAllPhotos = async (id:PhotoInputDTO):Promise<PhotoOutputDTO[]> => {
        try {
            const photoDatabase = new PhotoData()
            const results = await photoDatabase.getPhotos(id);
            return results;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}