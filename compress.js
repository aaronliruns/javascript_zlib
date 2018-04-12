var fs = require('fs');

//Javascript port of http://www.zlib.net/
var pako = require('pako');

// string to uint array
function unicodeStringToTypedArray(s) {
    var escstr = encodeURIComponent(s);
    var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    });
    var ua = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, i) {
        ua[i] = ch.charCodeAt(0);
    });
    return ua;
}


fs.readFile('oz_payload.txt', function(err, buf) {
  inputString = buf.toString();

  uint8ArrayOfContent = unicodeStringToTypedArray(inputString);

  var output = pako.deflate(uint8ArrayOfContent);

  fs.writeFile('oz_payload.txt.zlib', output, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });

});


// out will be a JavaScript Array of bytes
