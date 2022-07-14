import { InputShow } from './../types';
import { Request, Response } from 'express';
import { ShowBusiness } from './../business/ShowBusiness';

export class Controller {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    signUp = async (req: Request, res: Response) => {
        const {band_id, week_day, start_time, end_time} = req.body;
        const input:InputShow = {
            band_id,
            week_day,
            start_time,
            end_time
        }
        try {
            const show = await this.showBusiness.signUp(input);
            res.status(201).send({show});
        } catch (error: any) {
            const { statusCode, message } = error
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`)
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }

    getShowsFromTheDay = async (req: Request, res: Response) => {
        const {week_day} = req.body;
    
        try {
            const shows = await this.showBusiness.getShows(week_day);
            res.status(201).send({shows});
        } catch (error: any) {
            const { statusCode, message } = error
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`)
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }
}