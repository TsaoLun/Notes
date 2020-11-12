exports.concatArray = function (str, array) {
    return array.map(function (element) {
        return str + '' + element;
    });
};

function Mime() { }
Mime.prototype.define = function (str) { return str; };
var mime = new Mime();
mime.Mime = Mime;
module.exports = mime;