'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.catchRejection = exports.waitsFor = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function catchRejection(done) {
    return function (err) {
        console.error(err);
        done();
    };
}

function waitsFor(f, c, i) {
    var func = f,
        // this function returns true when promise is fufilled
    context = c,
        // optional "this" gets passed to adjust timeout
    intervalTime = i || 10; // optional interval

    return new _bluebird2.default(function (fufill, reject) {
        var interval = setInterval(function () {
            if (func()) {
                clearTimeout(timeout);
                clearInterval(interval);
                fufill();
            }
        }, intervalTime);

        var timeout = setTimeout(function () {
            clearInterval(interval);
            reject(new Error(context.test.title));
        }, context && context.timeout() || 2000);
    });
}

exports.waitsFor = waitsFor;
exports.catchRejection = catchRejection;