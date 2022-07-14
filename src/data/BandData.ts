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
}