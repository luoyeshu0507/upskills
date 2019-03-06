function a() {
    var that = this;
    try {
        console.log(this === that);
        b();
    } catch (e) {
        console.log(e.message);
    }
}

function b() {
    xxx.xxx;
}

a();