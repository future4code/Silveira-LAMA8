import { BandData } from "../data/BandData"
import { CustomError } from "../error/CustomError"
import { BandInputDTO } from "../model/Band"
import { IdGenerator } from "../services/idGenerator"
import { TokenGenerator } from "../services/tokenGenerator"

export class BandBusiness {
    async createBand(band: BandInputDTO) {
        try {
            const {token, name, music_genre, responsible} = band
            console.log(band);
            
            if (!token) {throw new CustomError (403,`Authorization token is required`)}
            const authenticator = new TokenGenerator()
            const tokenData = authenticator.verify(token)

            if (tokenData.role !== "ADMIN") {throw new CustomError(403,`Only administrators can add a band`)}

            if (!name) {throw new CustomError(422,`Band name is required`)}
            if (!music_genre) {throw new CustomError(422,`Band music genre is required`)}
            if (!responsible) {throw new CustomError(422,`Band responsible is required`)}

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const bandDatabase = new BandData()
            await bandDatabase.createBand(id, name, music_genre, responsible)
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    async getBand(data: any) {
        try {
            const {id, name} = data
            
            
            const bandDatabase = new BandData()
            if (!data.name && !data.id) {throw new CustomError(422,`Band's name or id required`)}
            if (data.id && !data.name) {
                const result = await bandDatabase.getBandById(id)
                return result
            } else if (data.name && !data.id) {
                const result = await bandDatabase.getBandByName(name)
                return result
            } else {
                throw new CustomError(422,`Band's ID or name is required`)
            }
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}