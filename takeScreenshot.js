exports.takeScreenshot = function takeScreenshot() {
    var screenshot = require('desktop-screenshot');

    var promise = new Promise(function(resolve, reject) {
        
        screenshot("screenshot.png", function(error, complete) {
            if(error)
                reject(error);
            else
                resolve("screenshot succeeded");
        });
    });

    return promise;
}