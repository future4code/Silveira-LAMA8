import { TicketData } from './../data/TicketData';
import { PhotoData } from "../data/PhotoData";
import { CustomError } from "../error/CustomError";
import { Photo, PhotoInputDTO } from "./../model/Photo";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class PhotoBusiness{
    constructor(
        private hashGenerator: HashGenerator,
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private photoData: PhotoData,
        private ticketData: TicketData
      ) {}
      public async photo(input: PhotoInputDTO){
    try {
        const {photo, token, event_id } = input
        if (!event_id) {
          throw new CustomError(422,"Invalid event_id");
        }
        const ticketExists = await this.ticketData.get(event_id);
        if (!ticketExists) {
          throw new CustomError (404, `Show was not found!`)
        }

        if (!photo) {
            throw new CustomError(422,"Invalid event_id");
          }
        const tokenData = this.tokenGenerator.verify(token)
        if (!tokenData) {
            throw new CustomError(403,"Invalid token");
        }


         const id = this.idGenerator.generate();
        // const event_id = tokenData.id;
       
      const newPhoto = new Photo(
        id,
        photo,
        event_id
      );
      await this.photoData.createPost(newPhoto);
      return newPhoto;
      }catch (error:any) {
        throw new CustomError(error.statusCode, error.message);
    }
}}