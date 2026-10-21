"use strict";
class Album1 {
    constructor(opts) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
        this.trackList = opts.trackList;
    }
    displayInfo() {
        console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`);
    }
}
class SpecialEditionAlbum extends Album1 {
    // bonusTracks
    // bonusTracks: string[];
    // constructor(opts: { title: string; artist: string; releaseYear: number, bonusTracks: string[] }) {
    //     super(opts);
    //     this.bonusTracks = opts.bonusTracks;
    // }
    getTitle() {
        return this.title;
    }
    displayInfo() {
        console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`);
        // console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
    }
}
const opts = {
    title: "Plastic Ono Band",
    artist: "John Lennon",
    releaseYear: 2000,
    bonusTracks: ["Power to the People", "Do the Oz"],
};
// let specialEditionAlbum = new SpecialEditionAlbum(opts);
class AlbumBase {
    constructor(opts) {
        this.trackList = [];
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
    addTrack(track) {
        this.trackList.push(track);
    }
}
class Album extends AlbumBase {
    addReview(author, review) {
    }
    ;
}
const album = new Album({
    title: "Unknown Album",
    artist: "Unknown Artist",
    releaseYear: 0,
});
