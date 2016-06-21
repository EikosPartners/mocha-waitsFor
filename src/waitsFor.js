import Promise from 'bluebird';

function catchRejection(done) {
    return function (err) {
        console.error(err);
        done();
    }
}

function waitsFor(f, c, i) {
    var func = f, // this function returns true when promise is fufilled
        context = c, // optional "this" gets passed to adjust timeout
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
            reject(new Error(context.test.title));
        }, context && context.timeout() || 2000)
    });
}

export {
    waitsFor,
    catchRejection
}
