const request = require("request")
const cheerio = require("cheerio")

// import request from 'request'
// import cheerio from 'cheerio'

const memesArray = request("https://imgflip.com/m/ai_memes", (error, response, body) => {
    if (!error) {

        const $ = cheerio.load(body)

        const imgArray = []

        $(".base-img").each((index, img) => {
            
            let imgSrc = img.prev ? img.attribs['data-src'] : img.attribs.src;

            imgArray.push( imgSrc.splice(2) )
        
        });

        return imgArray;

    } else {
        console.log("Error: " + error);
    }
});

// export default memesArray;
// exports.memesArray = memesArray;
module.exports = memesArray