exports.parse = function parse(JSON) {
    var blocks = JSON[0].fullTextAnnotation.pages[0].blocks;
    var q = blockToString(blocks[0]);
    var a0 = blockToString(blocks[1]);
    var a1 = blockToString(blocks[2]);
    var a2 = blockToString(blocks[3]);
    return { question: q, answer0: a0, answer1: a1, answer2: a2 };     
}

function blockToString(block) {
    var retChars = [];           // save characters in String Builder array
    for (var paragraph of block.paragraphs) {
        for (var word of paragraph.words) {
            for (var symbol of word.symbols) {
                retChars.push(symbol.text);
            }
            retChars.push(" ");
        }
        retChars.pop();
        retChars.push("\n\n");   // get rid of extraneous space
    }
    retChars.pop();              // get rid of extraneous \n\n
    return retChars.join("");
}

