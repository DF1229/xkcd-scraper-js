import * as cheerio from "cheerio";

export const unavailableComics = [404, 1037, 1350, 1416, 1525, 1608, 1663, 2067, 2198];

export function getComicUrl(num) {
    return `${process.env.SCRAPER_URL}/${num}`;
}

export async function fetchPage(url) {
    try {
        const res = await fetch(url);
        const data = await res.text();
        return data;
    } catch (err) {
        console.error(err);
        process.exit(2);
    }
}

export async function fetchComic(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Response not OK');

        const contentType = res.headers.get('content-type');
        if (!contentType.match('image/')) throw new Error('Image not of expected MIME-type');
        
        const buffer = await blobToBuffer(await res.blob());
        return buffer;
    } catch (err) {
        console.error(err);
        process.exit(3);
    }
}

async function blobToBuffer(blob) {
    return Buffer.from(await blob.arrayBuffer());
}

export async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

export function toImgUrl(src) {
    let res = src;
    res.trim();
    res.toLowerCase();
    res = 'https:' + res;
    return res;
}

export function getComicAttr(rawHtml) {
    const $ = cheerio.load(rawHtml);
    return $('div#comic img').attr();
}

export function getComicFilename(comicAttr) {
    let src = comicAttr.src;
    if (!src) throw new Error('No source attribute!');

    return src.replace('//imgs.xkcd.com/comics/', '');
}

export function getComicTitle(rawHtml) {
    const $ = cheerio.load(rawHtml);
    return $('div#ctitle').text();
}