const cheerio = require("cheerio");
const https = require('https');

function ASS(page, url="https://imgflip.com/m/ai_memes?page=") {
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
                    imgObj[index] = imgSrc
                });
                
                // Object.assign(imgObjjj, imgObj)
                // exportImgObj(imgObj);
                // fs.writeFileSync('G:\\Users\\Infinity\\Desktop\\js\\REACT\\rpa-app-web\\src\\meme-generator\\server\\data.json', JSON.stringify(imgObj))
                // console.log(imgObj)
                resolve(imgObj)
            });
        })
        // .on("error", (err) => {
        //     console.log("Error: " + err.message);
        // });
        // return imgObj
    })
}

// let memes = ASS()

// console.log(imgObj)

// export default memesArray;
// exports.memesArray = memesArray;

module.exports = ASS
