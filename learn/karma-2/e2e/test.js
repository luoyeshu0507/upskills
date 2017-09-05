var page = require('webpage').create(),
    system = require('system'),
    size, pageWidth, pageHeight;

page.viewportSize = { width: 600, height: 600 };
page.open('https://www.baidu.com', function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit(1);
    } else {
        window.setTimeout(function () {
            page.evaluate(function() {
              document.getElementById('kw').value = 100;
              document.getElementById('su').click();
            });
            page.render('a.jpg');
            phantom.exit();
        }, 200);
    }
});
