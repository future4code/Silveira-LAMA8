import { InputShow } from './../types';
import { Show } from './../model/Show';
import { IdGenerator } from './../services/idGenerator';
import { BandData } from './../data/BandData';
import { CustomError } from './../error/CustomError';
import { ShowData } from './../data/ShowData';

export class ShowBusiness {
    constructor(
        private showData: ShowData,
        private bandData: BandData,
        private idGenerator: IdGenerator
    ) { }

    signUp = async (input: InputShow):Promise<Show> => {
        const { band_id, week_day, start_time, end_time } = input;

        if (!band_id || !week_day || !start_time || !end_time) {
            throw new CustomError(422, `Invalid fields!`)
        };

        if (isNaN(start_time) || !Number.isInteger(start_time) || isNaN(end_time) || !Number.isInteger(end_time) || start_time<0 || end_time<0 || start_time>24 || end_time>24) {
            throw new CustomError(401, `Start_time and end_time have to be an integer number, representing the hours of the day!`)
        };

        if (week_day.toLowerCase() !== "friday" && week_day.toLowerCase() !== "saturday" && week_day.toLowerCase() !== "sunday") {
            throw new CustomError(422, `Week_day only accepts 'friday', 'saturday' or 'sunday' as a valid result`)
        };

        const bandExists = await this.bandData.getBandById(band_id);
        if (!bandExists) {
            throw new CustomError(404, `Band could not be found`)
        };
        const data = {
            week_day,
            start_time,
            end_time
        }
        
        const verification = await this.showData.verify(data);
        if (verification.length > 0 ) {
            throw new CustomError(401, `Another show is already registered at this time.`)
        };

        const id = this.idGenerator.generate();

        const newShow = new Show(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        );

        await this.showData.insert(newShow);

        return newShow;
    }

    getShows = async (week_day: string):Promise<Show[]> => {
        if (!week_day) {
            throw new CustomError(422, `Invalid fields!`)
        }
        if (week_day.toLowerCase() !== "friday" && week_day.toLowerCase() !== "saturday" && week_day.toLowerCase() !== "sunday") {
            throw new CustomError(422, `Week_day only accepts 'friday', 'saturday' or 'sunday' as a valid result`)
        };
        const shows = await this.showData.get(week_day);
        if (shows.length===0) {
            throw new CustomError(404, `No shows were found on this day!`)
        }
        return shows;
    }
}
