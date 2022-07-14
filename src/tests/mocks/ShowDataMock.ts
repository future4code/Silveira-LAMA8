import { ShowMock } from './ShowMock';
import { Show } from './../../model/Show';

export class ShowDataMock { 
    insert = async(show:Show) => {
    }

    get = async(week_day:string):Promise<Show[]> => {
        switch(week_day) {
            case "friday":
                return [ShowMock];
            default:
                return [];
        }
    }
}