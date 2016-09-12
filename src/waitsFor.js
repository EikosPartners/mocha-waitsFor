import Promise from 'bluebird';

function catchRejection(done) {
    return function (err) {
        throw err;
    }
}

function waitsFor(f, t, i) {
    var func = f, // this function returns true when promise is fufilled
        intervalTime = i || 10; // optional interval

    return new Promise(function (fufill, reject) {
        var interval = setInterval(function () {
            if (func()) {
                clearTimeout(timeout);
                clearInterval(interval);
                fufill();
            }
        }, intervalTime);

        var timeout = setTimeout(function () {
            clearInterval(interval);
            reject(new Error('Waits for condition never met: ' + f.toString()));
         }, t || 2000);
    });
}

export {
    waitsFor,
    catchRejec
}