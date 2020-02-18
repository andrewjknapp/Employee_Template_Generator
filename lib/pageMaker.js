const fs = require('fs');

console.log("Hello");

function pageWritter(infoObj) {
    let page = ``;
    page += JSON.stringify(infoObj, null, 1);

    fs.writeFile('../output/index.html', page, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("File Written");
        }
    })
}

pageWritter({hair: "Brown"});

module.exports = {
    pageWritter
}
