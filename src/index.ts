import { PhotoBusiness } from "./business/PhotoBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { PhotoController } from "./controller/PhotoController";
import { Usercontroller } from "./controller/UserController";
import { PhotoData } from "./data/PhotoData";
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

const photoBusiness = new PhotoBusiness(
    new HashGenerator(),
    new IdGenerator(),
    new TokenGenerator(),
    new PhotoData()
    )
const photoController = new PhotoController(photoBusiness)

app.post("/photo", photoController.photo)