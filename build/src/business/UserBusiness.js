"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const User_1 = require("../model/User");
class UserBusiness {
    constructor(hashGenerator, idGenerator, tokenGenerator, userData) {
        this.hashGenerator = hashGenerator;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.userData = userData;
    }
    signup(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name || !email || !password) {
                    throw new CustomError_1.CustomError(422, "Missing input");
                }
                if (password.length < 6) {
                    throw new CustomError_1.CustomError(422, "Invalid password");
                }
                if (!email.includes("@") || !email.includes(".com")) {
                    throw new CustomError_1.CustomError(422, "Invalid email");
                }
                const user = yield this.userData.findUserByEmail(email);
                if (user) {
                    throw new CustomError_1.CustomError(401, "Invalid credentials");
                }
                const id = this.idGenerator.generate();
                const cypherPassword = yield this.hashGenerator.hash(password);
                yield this.userData.createUser(new User_1.User(id, name, email, cypherPassword, (0, User_1.stringToUserRole)(role)));
                const acessToken = this.tokenGenerator.generate({
                    id,
                    role,
                });
                return { acessToken };
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new CustomError_1.CustomError(422, "Missing input");
                }
                const user = yield this.userData.findUserByEmail(email);
                if (!user) {
                    throw new CustomError_1.CustomError(400, "User already created");
                }
                const passwordIsCorrect = this.hashGenerator.compareHash(password, user.getPassword());
                if (!passwordIsCorrect) {
                    throw new CustomError_1.CustomError(401, "Invalid credentials");
                }
                const accessToken = this.tokenGenerator.generate({
                    id: user.getId(),
                    role: user.getRole(),
                });
                return { accessToken };
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map