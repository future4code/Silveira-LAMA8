"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUserRole = exports.User = exports.ROLE = void 0;
const CustomError_1 = require("../error/CustomError");
var ROLE;
(function (ROLE) {
    ROLE["NORMAL"] = "NORMAL";
    ROLE["ADMIN"] = "ADMIN";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getPassword = () => {
            return this.password;
        };
        this.getRole = () => {
            return this.role;
        };
    }
    static toUserModel(data) {
        return new User(data.id, data.name, data.email, data.password, data.role);
    }
}
exports.User = User;
const stringToUserRole = (input) => {
    switch (input) {
        case "NORMAL":
            return ROLE.NORMAL;
        case "ADMIN":
            return ROLE.ADMIN;
        default:
            throw new CustomError_1.CustomError(422, "Invalid user role");
    }
};
exports.stringToUserRole = stringToUserRole;
//# sourceMappingURL=User.js.map