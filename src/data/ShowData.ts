import { CustomError } from './../error/CustomError';
import { Show } from './../model/Show';
import { BaseData } from "./BaseData";

const table_name = "NOME_TABELA_SHOWS";

export class ShowData extends BaseData{
    insert = async(show:Show) => {
        try {
            await ShowData
            .connection(table_name)
            .insert(show);
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    get = async(week_day:string):Promise<Show[]> => {
        try {
            const shows:Show[] = await ShowData
            .connection(table_name)
            .select(`*`)
            .where({week_day})
            .orderBy(`start_time`);
            return shows;
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}