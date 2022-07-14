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
exports.UserData = void 0;
const CustomError_1 = require("../error/CustomError");
const User_1 = require("../model/User");
const BaseData_1 = require("./BaseData");
class UserData extends BaseData_1.BaseData {
    constructor() {
        super(...arguments);
        this.tableName = "NOME_TABELAS_USUÁRIOS";
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseData_1.BaseData.connection(this.tableName).insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield BaseData_1.BaseData.connection(this.tableName).select("*")
                    .where({ email: email });
                return user[0] && User_1.User.toUserModel(user[0]);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map