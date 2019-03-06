async function f2(){
    console.log('f2');
    var y = await Promise.resolve(20);
    console.log(y);
}

f2();
Promise.resolve().then(x => console.log('end'));






async function f2(){
    console.log('f2');
    var y = await f1();
    console.log(y);
}

async function f1(){
    return Promise.resolve(20);
}

f2();
Promise.resolve().then(x => console.log('end'));