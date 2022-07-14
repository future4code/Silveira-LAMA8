"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
class Show {
    constructor(id, week_day, start_time, end_time, band_id) {
        this.id = id;
        this.week_day = week_day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.band_id = band_id;
        this.getId = () => {
            return this.id;
        };
        this.getWeekDay = () => {
            return this.week_day;
        };
        this.getStartTime = () => {
            return this.start_time;
        };
        this.getEndTime = () => {
            return this.end_time;
        };
        this.getBandId = () => {
            return this.band_id;
        };
    }
}
exports.Show = Show;
//# sourceMappingURL=Show.js.map