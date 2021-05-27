const diff = require('diff');
const fs = require('fs');
const moment = require('moment');
const path = require('path');

function diffHtmlText(a, b, path = './') {
  const result = diff.convertChangesToXML(diff.diffChars(a, b));
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        ins {
          background: #1fec28;
        }
        ins:before {
          content: '++';
        }
        del {
          background: #ff6a6a;
        }
        del:before {
          content: '--';
        }
        body {
          padding: 24px;
          line-height: 24px;
          white-space: pre-wrap;
          font-size: 14px;
          color: #333;
        }
      </style>
    </head>
    <body>
      ${result}
    </body>
    </html>
  `;
  // fs.writeFileSync(path.resolve(path, 'diff-' + moment().formant('YYYYMMDDHHmmss-') + Math.random() + '.html'), html);
  return html;
}
describe('my first test', function () {
  it('does not do much', function() {
    expect(true).to.equal(true);
  })

  it('Visite a page', function() {
    cy.visit('https://huaban.com/')

    cy.contains('type').click()

    cy.get('body').invoke('text').then((text1) => {
      cy.get('.title').then(($el) => {
        const text = $el.get(0).innerHTML;
        $el.get(0).innerHTML = text.replace('花瓣', '落叶树');
      })

      cy.get('body').invoke('text').then((text2) => {
        cy.writeFile('./diff.html', diffHtmlText(text1, text2));
      })
    })
  })

  it('Visite a page', function() {
    cy.visit('http://127.0.0.1:8080/diff.html');
  })
})






