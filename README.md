# xkcd-scraper-js

This project is a simple webscraper for the [xkcd webcomic](https://www.xkcd.com/) by [Randall Munroe](https://xkcd.com/about/).
What it does is request a webpage from 1 to a manually set number (the amount of webcomics) from `https://xkcd.com/<number>`, where `<number>` is the current comic being requested.

It parses the raw HTML response to extract the link to the image, the title of the comic, and the alt text of the comic.
Next, it downloads the comic from the extacted link, and converts it to raw binary data.
All of this information is saved into a self-hosted database powered by MongoDB, for later use.

## Usage
If you were to `git clone` this project and `npm install` the required dependancies, you still couldn't run it.
As of right now this script doesn't function if you were to try and run it after installing the dependancies.

Furthermore, this project was only ever meant as a personal data-gathering tool to run simple statistical analysis.
Hence, this project will never receive an update to make it easily self-hostable. 
Yes, it can be done if you're familiar with the dependancies, but it was never meant to be downloaded and used by the general public.
