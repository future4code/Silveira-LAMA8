import { CustomError } from './../error/CustomError';
import { Band } from './../model/Band';
import { BaseData } from "./BaseData"

export class BandData extends BaseData{
    getBandById = async(id:string):Promise<Band | undefined> => {
        try {
            const [band]:Band[] = await BandData
            .connection(`NOME_TABELA_BANDAS`)
            .select(`*`)
            .where({id})
            return band;
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
    public async createBand (
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ):Promise<void | undefined>  {
        try {
            await BandData
                .connection(`NOME_TABELA_BANDAS`)
                .insert({
                    id, name, music_genre, responsible
                })
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getBandByName (name: string) {
        try {
            const result = await BandData 
                .connection(`NOME_TABELA_BANDAS`)
                .select("*")
                .where({ name })
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
