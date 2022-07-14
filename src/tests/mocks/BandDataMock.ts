import { BandMock } from './BandMock';
import { Band } from '../../model/Band';

export class BandDataMock { 
    getBandById = async(id:string):Promise<Band | undefined> => {
       switch(id) {
        case "1":
            return BandMock;
        default:
            return undefined;
       }
    }
}