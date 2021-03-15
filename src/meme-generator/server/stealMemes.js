const cheerio = require("cheerio");
const https = require('https');

function stealMemes(page, url="https://imgflip.com/m/ai_memes?page=") {
    return new Promise (resolve => {
        https.get(url + page, (resp) => {
            let data = '';
            const imgObj = {}
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const $ = cheerio.load(data)
                $(".base-img").each((index, img) => {
                    let imgSrc = img.prev ? img.attribs['data-src'] : img.attribs.src;
                    imgObj[index] = imgSrc;
                });
                resolve(imgObj);
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })
}

module.exports = stealMemes;
