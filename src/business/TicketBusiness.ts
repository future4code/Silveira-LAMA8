import { UserTicket } from './../model/Ticket';
import { ShowData } from './../data/ShowData';
import { InputTicket, InputUserTicket } from './../types';
import { TicketData } from './../data/TicketData';
import { CustomError } from "../error/CustomError"
import { IdGenerator } from "../services/idGenerator"
import { TokenGenerator } from "../services/tokenGenerator"
import { Ticket } from '../model/Ticket';

export class TicketBusiness {
    constructor(
        private ticketData: TicketData,
        private showData:ShowData
    ) { }
    async createTicket(ticket: InputTicket) {
        try {
            const { token, name, value, show_id, quantity } = ticket;

            if (!token) { throw new CustomError(403, `Authorization token is required`) }
            const authenticator = new TokenGenerator()
            const tokenData = authenticator.verify(token)
            if (!tokenData) {throw new CustomError(404, `User not found!`)}
            if (tokenData.role !== "ADMIN") { throw new CustomError(403, `Only administrators can add a ticket`) }

            if (!name || !value || !show_id || !quantity) { throw new CustomError(422, `Invalid fields`) };
            const showExists = await this.showData.getShowById(show_id);
            if(!showExists) {
                throw new CustomError(404, `Show was not found!`)
            }
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const newTicket = new Ticket(
                id,
                name,
                value,
                show_id,
                quantity
            )
            await this.ticketData.create(newTicket);

            return newTicket;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    async buyTicket(data:InputUserTicket) {
        try {
            const { token, show_id, quantity } = data;

            if (!token) { throw new CustomError(403, `Authorization token is required`) }
            const authenticator = new TokenGenerator()
            const tokenData = authenticator.verify(token)
            if (!tokenData) {throw new CustomError(404, `User not found!`)}
            const user_id = tokenData.id;

            if (!show_id || !quantity) { throw new CustomError(422, `Invalid fields`) };
            const ticketExists = await this.ticketData.get(show_id);
            if(!ticketExists) {
                throw new CustomError(404, `Tickets from this show weren't found!`)
            }
            if (ticketExists<quantity) {
                throw new CustomError (401, `You're trying to purchase more tickets than those available!`)
            }
            
            await this.ticketData.updateQuantity(show_id, quantity);

            const newPurchase = new UserTicket(
                show_id,
                quantity,
                user_id
            )

            await this.ticketData.buy(newPurchase);
            
            return newPurchase;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

}