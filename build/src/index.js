"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = require("./business/UserBusiness");
const app_1 = require("./controller/app");
const UserController_1 = require("./controller/UserController");
const UserData_1 = require("./data/UserData");
const hashGenerator_1 = require("./services/hashGenerator");
const idGenerator_1 = require("./services/idGenerator");
const tokenGenerator_1 = require("./services/tokenGenerator");
const userController = new UserController_1.Usercontroller(new UserBusiness_1.UserBusiness(new hashGenerator_1.HashGenerator(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator(), new UserData_1.UserData()));
app_1.app.post("/user/signup", userController.signup);
app_1.app.post("/user/login", userController.login);
//# sourceMappingURL=index.js.map