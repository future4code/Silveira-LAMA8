import { BandBusiness } from "./business/BandBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { Usercontroller } from "./controller/UserController";
import { UserData } from "./data/UserData";
import { HashGenerator } from "./services/hashGenerator";
import { IdGenerator } from "./services/idGenerator";
import { TokenGenerator } from "./services/tokenGenerator";

const userBusiness = new UserBusiness(
    new HashGenerator(),
    new IdGenerator(),
    new TokenGenerator(),
    new UserData()
    )
const userController = new Usercontroller(userBusiness)
app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)


const bandBusiness = new BandBusiness()
const bandController = new BandController(bandBusiness)
app.get("/band", bandController.getBand)
app.post("/band", bandController.createBand)