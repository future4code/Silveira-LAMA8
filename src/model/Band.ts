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
    setId(id: string){
        this.id = id;
    }
    setName(name: string){
        this.name = name;
    }
    setGenre(music_genre: string){
        this.music_genre = music_genre;
    }
    setResponsible(responsible: string){
        this.responsible = responsible;
    }  
}

export interface BandInputDTO {
    token: string | undefined,
    name: string,
    music_genre: string,
    responsible: string
}