export class Band {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string,

    ) { }

    getId = (): string => {
        return this.id
    }
    getName = (): string => {
        return this.name
    }
    getMusicGenre = (): string => {
        return this.music_genre
    }
    getResponsible = (): string => {
        return this.responsible
    }
}