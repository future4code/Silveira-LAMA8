import { BandData } from "../data/BandData"
import { BandInputDTO } from "../model/Band"
import { IdGenerator } from "../services/idGenerator"
import { TokenGenerator } from "../services/tokenGenerator"

export class BandBusiness {
    async createBand(band: BandInputDTO) {
        try {
            const {token, name, music_genre, responsible} = band
            if (!token) {throw new Error(`Authorization token is required`)}
            const authenticator = new TokenGenerator()
            const tokenData = authenticator.verify(token)

            if (tokenData.role !== "ADMIN") {throw new Error(`Only administrators can add a band`)}

            if (!name) {throw new Error(`Band name is required`)}
            if (!music_genre) {throw new Error(`Band music genre is required`)}
            if (!responsible) {throw new Error(`Band responsible is required`)}

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const bandDatabase = new BandData()
            await bandDatabase.createBand(id, name, music_genre, responsible)
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    async getBand(data: any) {
        try {
            const {id, name} = data
            const bandDatabase = new BandData()
            if (id) {
                const result = await bandDatabase.getBandById(id)
                return result
            } else if (name) {
                const result = await bandDatabase.getBandByName(name)
                return result
            } else {
                throw new Error(`Band ID or name is required`)
            }
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}