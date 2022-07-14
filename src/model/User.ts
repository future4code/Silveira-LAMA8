export enum ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export class User {
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:ROLE
    ) {}

    getId = ():string => {
        return this.id
    }
    getName = ():string => {
        return this.name
    }
    getEmail = ():string => {
        return this.email
    }
    getPassword = ():string => {
        return this.password
    }
    getRole = ():ROLE => {
        return this.role
    }
}