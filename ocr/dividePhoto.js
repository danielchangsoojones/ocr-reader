exports.dividePhoto = function dividePhoto() {
    var imageToSlices = require('image-to-slices');
    var width = 3360 / 3;
    var nextWidth = 3360 * (2/3);
    var firstX = 1100;
    var secondX = 2100 * (2/3);
    var lineXArray = [firstX, secondX];
    var lineYArray = [width, nextWidth];
    var source = '../screenshot.png';

    imageToSlices(source, lineXArray, lineYArray, {
        saveToDir: '.',
        clipperOptions: {
            canvas: require('canvas')
        }    
    }, function() {
        console.log('the source image has been sliced into 9 sections!');
    });
}

exports.dividePhoto();