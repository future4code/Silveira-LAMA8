import { Request, Response } from "express"
import { PhotoBusiness } from "../business/PhotoBusiness"
import { PhotoInputDTO } from "../model/Photo"

export class PhotoController {
    constructor(
        private photoBusiness: PhotoBusiness
    ) { }
    

    async getPhotos(req: Request, res: Response) {
        const id = req.params.id as any
        try {            
               const result = await new PhotoBusiness().getAllPhotos(id)
               res.status(200).send(result)
          
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