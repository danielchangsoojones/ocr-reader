
runScreenshots();
function runScreenshots() {
    takeScreenshot();
    setInterval(takeScreenshot, 10000);
}

function takeScreenshot() {
    var Screenshot = require('./takeScreenshot');
    Screenshot.takeScreenshot().then(function() {
        console.log("took new screenshot");
        dividePhoto().then(function() {
            var OCR = require('./ocr/readScreenshot');
            OCR.runReader("forest_quad");
        })
    })
}

function dividePhoto() {
    var imageToSlices = require('image-to-slices');
    var width = 3360 / 3;
    var nextWidth = 3360 * (2/3);
    var firstX = 1100;
    var secondX = 2100 * (2/3);
    var lineXArray = [firstX, secondX];
    var lineYArray = [width, nextWidth];
    var source = './screenshot.png';

    var promise = new Promise(function(resolve, reject) {
        imageToSlices(source, lineXArray, lineYArray, {
            saveToDir: './ocr/photoSections',
            clipperOptions: {
                canvas: require('canvas')
            }    
        }, function() {
            console.log("hiii");
            resolve('the source image has been sliced into 9 sections!');
        });
    })

    return promise;
}


