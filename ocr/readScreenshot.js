process.env.GOOGLE_APPLICATION_CREDENTIALS = "ocr/ocr-reader-edcdf79258cd.json";

const vision = require('@google-cloud/vision');

exports.runReader = async function runReader(box_identifier) {
    // Creates a client
    
    runOCR(1, "random");
}

async function runOCR(fileNum, box_identifier) {
    const client = new vision.ImageAnnotatorClient();

    const fileName = "ocr/photoSections/section-" + fileNum + ".png";

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
        var isMultiplierString = checkIfIsMultiplier(description);
        if (isMultiplierString) {
            var multiplier = parseMultiplierString(detection.description);
            if (!isNaN(multiplier)) {
                saveRidesharePrice(box_identifier, multiplier);
            }
        }
    }
}

//checking if last char is x
//checking if first char is a number
//That seems like it won't pull any false positives.
function checkIfIsMultiplier(string) {
    var lastChar = string.slice(-1);
    if (lastChar == "x") {
        var firstChar = string.charAt(0);
        var number = Number(firstChar);
        var isNumber = !isNaN(number);
        return isNumber;
    } else {
        return false;
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

