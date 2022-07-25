import { Photo } from "./../model/Photo";
import { BaseData } from "./BaseData";

export class PhotoData extends BaseData{
    public async createPost(photo: Photo): Promise<void> {
      try {
        await BaseData.connection("NOME_TABELAS_PHOTO").insert({
          id: photo.getId(),
          photo: photo.getPhoto(),
          event_id: photo.getEventId()
        });
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
}