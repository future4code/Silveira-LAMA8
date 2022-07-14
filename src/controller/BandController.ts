import { InputShow } from './../types';
import { Request, Response } from 'express';
import { ShowBusiness } from './../business/ShowBusiness';
import { BandBusiness } from '../business/BandBusiness';

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }
    async getBand(req: Request, res: Response) {
        try {
            const data = {id: req.body.id, name: req.body.name}

            const result = await this.bandBusiness.getBand(data)

            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send({error: error.message})
        }
    }
}