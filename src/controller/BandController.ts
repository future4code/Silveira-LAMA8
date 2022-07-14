import { InputShow } from './../types';
import { Request, Response } from 'express';
import { ShowBusiness } from './../business/ShowBusiness';
import { BandBusiness } from '../business/BandBusiness';

export class Controller {
    constructor(
        private showBusiness: ShowBusiness
    ) { }
    async getBand(req: Request, res: Response) {
        try {
            const data = {id: req.body.id, name: req.body.name}
            
            const bandBusiness = new BandBusiness()
            const result = await bandBusiness.getBand(data)

            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send({error: error.message})
        }
    }

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