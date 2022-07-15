import { InputVerify } from './../types';
import { CustomError } from './../error/CustomError';
import { Show } from './../model/Show';
import { BaseData } from "./BaseData";

const table_name = "NOME_TABELA_SHOWS";

export class ShowData extends BaseData{
    insert = async(show:Show) => {
        try {
            await ShowData
            .connection(table_name)
            .insert({
                id: show.getId(),
                week_day: show.getWeekDay(),
                start_time: show.getStartTime(),
                end_time: show.getEndTime(),
                band_id: show.getBandId()
            });
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

    verify = async(data:InputVerify) => {
        try {
            const shows:Show[] = await ShowData
            .connection(table_name)
            .select(`*`)
            .where({week_day: data.week_day, start_time: data.start_time })
            .orWhere({week_day: data.week_day, end_time: data.start_time })
            .orWhere({week_day: data.week_day, start_time: data.end_time })
            .orWhere({week_day: data.week_day, end_time: data.end_time })

            return shows;
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}