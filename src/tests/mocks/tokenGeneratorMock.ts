import { USER_ROLES } from "../../src/model/User"
import { AuthenticationData } from "../../../../../Desktop/repository-labenu/silveira-Karen-Kubo/modulo5/testes-backend/src/Services/tokenGenerator"

export class TokenGeneratorMock {
    public generate = (input: AuthenticationData): string => {
        return "token"
    }

    public verify(token: string) {
        return {
            id: "id_mock",
            role: USER_ROLES.NORMAL
        }
    }
}