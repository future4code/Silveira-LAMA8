"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
class Band {
    constructor(id, name, music_genre, responsible) {
        this.id = id;
        this.name = name;
        this.music_genre = music_genre;
        this.responsible = responsible;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getMusicGenre = () => {
            return this.music_genre;
        };
        this.getResponsible = () => {
            return this.responsible;
        };
    }
}
exports.Band = Band;
//# sourceMappingURL=Band.js.map