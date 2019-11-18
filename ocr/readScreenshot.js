process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/danieljones/Documents/ocr-reader/ocr/ocr-reader-edcdf79258cd.json";

const vision = require('@google-cloud/vision');

exports.runReader = async function runReader(box_identifier) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = '/Users/danieljones/Documents/ocr-reader/screenshot.png';

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    // detections.forEach(text => console.log(text));
    getSurgeMultiplier(detections, box_identifier);
}

function getSurgeMultiplier(detections, box_identifier) {
    for (var i = 0; i < detections.length; i++) {
        var detection = detections[i];
        var description = detection.description;
        if (description == "UberXL") {
            var previousDetection = detections[i + 1];
            var multiplier = parseMultiplierString(previousDetection.description);
            if (!isNaN(multiplier)) {
                saveRidesharePrice(box_identifier, multiplier);
            }
        }
    }
}

function parseMultiplierString(multiplier) {
    var removedXMultiplier = multiplier.substring(0, multiplier.length - 1);
    var number = Number(removedXMultiplier);
    console.log("multiplier: " + number);
    return number;
}

function saveRidesharePrice(box_identifier, multiplier) {
    var Save = require('./saveRidesharePrice');
    Save.saveRidesharePrice(box_identifier, multiplier);
}

