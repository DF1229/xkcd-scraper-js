import * as dotenv from "dotenv";
import * as db from './lib/db/database.mjs'
dotenv.config();
db.connect();

import * as util from "./lib/util.mjs";
import ComicModel from './lib/db/model/comic.mjs';

for (let num = 1; num <= 2745; num++) {
    if (util.unavailableComics.includes(num)) continue;
    
    const pageUrl = util.getComicUrl(num)
    const rawHtml = await util.fetchPage(pageUrl);

    const comicAttr = util.getComicAttr(rawHtml);
    const comicUrl = util.toImgUrl(comicAttr.src);
    const filename = util.getComicFilename(comicAttr);
    const comicBuffer = await util.fetchComic(comicUrl);
    const title= util.getComicTitle(rawHtml);

    const comicData = {
        num: num,
        title: title,
        alt: comicAttr.title,
        filename: filename,
        url: pageUrl,
    }

    await ComicModel.new(comicBuffer, comicData);

    console.log(`${num}: ${comicUrl}`);
    await util.sleep(750);
}

process.once('beforeExit', () => {
    db.close();
})

process.exit(0);