import { Request, Response } from 'express';
import { BandBusiness } from '../business/BandBusiness';
import { BandInputDTO } from '../model/Band';
export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }
    async createBand(req: Request, res: Response) {
        try {
            const input: BandInputDTO = {
                token: req.headers.authorization,
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }
            console.log(input);
            

            const bandBusiness = new BandBusiness()
            await bandBusiness.createBand(input)

            res.status(200).send({message: `Band inserted successfully`})
        } catch (error:any) {
            const { statusCode, message } = error
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`)
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }

    async getBand(req: Request, res: Response) {
        try {
            const id = req.query.id
            const name = req.query.name
            // console.log(name);
            const dataId = {id: id}
            const dataName = {name: name}
            
            if(id && !name){
               const result = await new BandBusiness().getBand(dataId)
               res.status(200).send(result)
            }

            if(!id && name){
               const result = await new BandBusiness().getBand(dataName)
                res.status(200).send(result)
            }

          
        } catch (error:any) {
            const { statusCode, message } = error
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`)
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }
}