
runScreenshots();
function runScreenshots() {
    takeScreenshot();
    setInterval(takeScreenshot, 10000);
}

function takeScreenshot() {
    var Screenshot = require('./takeScreenshot');
    Screenshot.takeScreenshot().then(function() {
        console.log("took new screenshot");
        var OCR = require('./ocr/readScreenshot');
        OCR.runReader("forest_quad");
    }, function(error) {
        console.log(error);
    });
}


