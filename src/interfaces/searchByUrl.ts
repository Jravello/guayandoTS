import { Song } from "./song";

export interface SearchByUrlPlaylist {
    songs: Song[],
    title: string
}