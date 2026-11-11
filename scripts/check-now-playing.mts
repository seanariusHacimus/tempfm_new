import assert from "node:assert/strict";
import { pickTrack, parseTrackTitle } from "../src/lib/icecast.ts";
import {
    dateInTashkent,
    findCurrentShow,
    findNextShow,
    zonedTashkent,
    type WeeklySchedule,
} from "../src/lib/schedule.ts";
import uz from "../src/i18n/locales/uz.ts";
import ru from "../src/i18n/locales/ru.ts";

const uzShows = uz.schedule.shows as WeeklySchedule;
const ruShows = ru.schedule.shows as WeeklySchedule;

function at(day: number, hour: number, minute = 0) {
    // November 2026: Sunday the 8th, Monday the 9th, … Wednesday the 11th.
    return dateInTashkent(2026, 11, day, hour, minute);
}

const zone = zonedTashkent(at(11, 17, 15));
assert.equal(zone.weekday, "wed");
assert.equal(zone.minutes, 17 * 60 + 15);
assert.equal(zonedTashkent(at(11, 0, 30)).minutes, 30);
assert.equal(zonedTashkent(at(9, 23, 45)).weekday, "mon");

assert.equal(findCurrentShow(uzShows, at(11, 17, 15))?.title, "Siz yolg'iz emassiz");
assert.equal(findCurrentShow(uzShows, at(11, 17, 15))?.host, "Go'zal Karimova");
assert.equal(findCurrentShow(ruShows, at(11, 17, 15))?.title, "Сен ёлгиз эмассан");
assert.equal(findCurrentShow(ruShows, at(11, 17, 15))?.host, "Гузаль Каримова");

assert.equal(findCurrentShow(uzShows, at(9, 22, 30))?.title, "Tungi Temp");
assert.equal(findCurrentShow(uzShows, at(10, 3, 0))?.title, "Tungi Temp");
assert.equal(findCurrentShow(uzShows, at(10, 7, 59))?.title, "Tungi Temp");
assert.equal(findCurrentShow(uzShows, at(10, 8, 0))?.title, "Wake up shou");
assert.equal(findCurrentShow(uzShows, at(10, 22, 0)), null);

assert.equal(findCurrentShow(uzShows, at(8, 3, 0))?.title, "Shanba Oqshomi");
assert.equal(findCurrentShow(uzShows, at(8, 6, 0))?.title, "Dam Olish Kuni");
assert.equal(findCurrentShow(uzShows, at(8, 12, 0))?.title, "Dam Olish Kuni");
assert.equal(findCurrentShow(ruShows, at(8, 12, 0))?.title, "День Отдыха");
assert.equal(findCurrentShow(uzShows, at(9, 3, 0)), null);
assert.equal(findCurrentShow(uzShows, at(9, 20, 30))?.host, "Tony Lozenzo");
assert.equal(findCurrentShow(ruShows, at(9, 20, 30))?.host, "Тони Лоренцо");

assert.equal(findNextShow(uzShows, at(11, 17, 15))?.title, "Oqshom tempida");
assert.equal(findNextShow(uzShows, at(8, 3, 0))?.title, "Dam Olish Kuni");
assert.equal(findNextShow(uzShows, at(8, 12, 0))?.title, "Wake up shou");
assert.equal(findNextShow(uzShows, at(8, 12, 0))?.host, "Otabek Tojiboyev");
assert.equal(findNextShow(uzShows, at(10, 22, 0))?.title, "Wake up shou");
assert.equal(findNextShow(ruShows, at(11, 17, 15))?.host, "Роксана Абидова");

assert.deepEqual(parseTrackTitle("Artist - Title"), { artist: "Artist", title: "Title" });
assert.deepEqual(parseTrackTitle("Artist — Title - Live"), {
    artist: "Artist",
    title: "Title - Live",
});
assert.deepEqual(parseTrackTitle("Jay-Z feat. Someone"), {
    artist: "",
    title: "Jay-Z feat. Someone",
});
assert.deepEqual(parseTrackTitle("  A &amp; B  -  Song&#39;s Name  "), {
    artist: "A & B",
    title: "Song's Name",
});

const live = {
    icestats: {
        source: [
            { listenurl: "http://tempradio-live.uz:8000/live", genre: "various" },
            { listenurl: "http://tempradio-live.uz:8000/streammp3", title: "   " },
            { listenurl: "http://tempradio-live.uz:8000/streamaac", title: "-" },
        ],
    },
};
assert.deepEqual(pickTrack(live), {
    hasTrack: false,
    artist: "",
    title: "",
    rawTitle: null,
    mount: "/live",
});

const withTitle = {
    icestats: {
        source: {
            listenurl: "http://tempradio-live.uz:8000/streammp3",
            title: "Sevara - Yalla",
        },
    },
};
assert.equal(pickTrack(withTitle).hasTrack, true);
assert.equal(pickTrack(withTitle).artist, "Sevara");
assert.equal(pickTrack(withTitle).title, "Yalla");
assert.equal(pickTrack(withTitle).mount, "/streammp3");

const preferLive = {
    icestats: {
        source: [
            { listenurl: "http://tempradio-live.uz:8000/streamaac", title: "Other - Song" },
            { listenurl: "http://tempradio-live.uz:8000/live", title: "Main - Track" },
        ],
    },
};
assert.equal(pickTrack(preferLive).mount, "/live");
assert.equal(pickTrack(preferLive).title, "Track");

const fallbackMount = {
    icestats: {
        source: [
            { listenurl: "http://tempradio-live.uz:8000/live" },
            { listenurl: "http://tempradio-live.uz:8000/streammp3", yp_currently_playing: "DJ - Night" },
        ],
    },
};
assert.equal(pickTrack(fallbackMount).mount, "/streammp3");
assert.equal(pickTrack(fallbackMount).artist, "DJ");
assert.equal(pickTrack(fallbackMount).title, "Night");

console.log("now-playing checks passed");
