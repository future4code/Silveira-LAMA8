import { Ticket, UserTicket } from './../model/Ticket';
import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";


export class TicketData extends BaseData {
    protected tableName: string = "NOME_TABELAS_INGRESSOS"

    create = async (ticket: Ticket) => {
        try {
            await BaseData
                .connection(this.tableName)
                .insert({
                    id: ticket.getId(),
                    name: ticket.getName(),
                    value: ticket.getValue(),
                    show_id: ticket.getShowId(),
                    quantity: ticket.getQuantity()
                })
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    get = async (show_id:string):Promise<Ticket> => {
        try {
            const [result] = await BaseData
                .connection(this.tableName)
                .select()
                .where({show_id})
            return result;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    getQuantityFromShow = async (show_id:string):Promise<number> => {
        try {
            const [result]:number[] = await BaseData
                .connection(this.tableName)
                .select(`quantity`)
                .where({show_id})
            return result;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    buy = async (userTicket: UserTicket) => {
        try {
            await BaseData
            .connection(`COMPRAS_DE_INGRESSOS`)
            .insert({
                show_id: userTicket.getShowId(),
                quantity: userTicket.getQuantity(),
                user_id: userTicket.getUserId()
            })
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    updateQuantity =async (show_id:string, newValue:number) => {
        try {
            const [findQuantity] = await BaseData
            .connection(this.tableName)
            .select(`quantity`).where({show_id});
            
            await BaseData
            .connection(this.tableName)
            .update({quantity: findQuantity.quantity + newValue})
            .where({show_id})
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }
} 
