
exports.saveRidesharePrice = function saveRidesharePrice(box_identifier, multiplier) {
    saveWithAPICall(multiplier, box_identifier);
}

function saveWithAPICall(multiplier, box_identifier) {
    const https = require('https');

    var url = "https://btown-rides-development.herokuapp.com/hackyPrice?";
    url += "multiplier=" + multiplier;
    url += "&box_identifier=" + box_identifier;

    https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(data);
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}