import { TicketController } from './controller/TicketController';
import { TicketBusiness } from './business/TicketBusiness';
import { ShowController } from './controller/ShowController';
import { ShowBusiness } from './business/ShowBusiness';
import { BandBusiness } from "./business/BandBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { Usercontroller } from "./controller/UserController";
import { UserData } from "./data/UserData";
import { HashGenerator } from "./services/hashGenerator";
import { IdGenerator } from "./services/idGenerator";
import { TokenGenerator } from "./services/tokenGenerator";
import { ShowData } from './data/ShowData';
import { BandData } from './data/BandData';
import { TicketData } from './data/TicketData';
//USER
const userBusiness = new UserBusiness(
    new HashGenerator(),
    new IdGenerator(),
    new TokenGenerator(),
    new UserData()
    )
const userController = new Usercontroller(userBusiness)
app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

//BAND
const bandBusiness = new BandBusiness()
const bandController = new BandController(bandBusiness)
app.get("/band", bandController.getBand)
app.post("/band", bandController.createBand)

//SHOW
const showBusiness = new ShowBusiness(
    new ShowData(),
    new BandData(),
    new IdGenerator()
)
const showController = new ShowController(
    showBusiness
)
app.post("/show", showController.signUp);
app.get("/show", showController.getShowsFromTheDay);

//TICKET
const ticketBusiness = new TicketBusiness(
    new TicketData(),
    new ShowData()
);
const ticketController = new TicketController(
    ticketBusiness
)
app.post("/ticket", ticketController.createTicket);
app.post("/purchase", ticketController.purchase);