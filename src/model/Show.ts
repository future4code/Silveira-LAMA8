
export class Show {
    constructor(
        private id:string,
        private week_day:string,
        private start_time:number,
        private end_time:number,
        private band_id:string
    ) {}

    getId = ():string => {
        return this.id
    }
    getWeekDay = ():string => {
        return this.week_day
    }
    getStartTime = ():number => {
        return this.start_time
    }
    getEndTime = ():number => {
        return this.end_time
    }
    getBandId = ():string => {
        return this.band_id
    }
}