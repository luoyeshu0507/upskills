let Emoji = require('./emoji');

let emojiRoot = '//bqq.gtimg.com/qidian/src/themes/emoji/';
let qqemojiRoot = '//bqq.gtimg.com/qidian/src/themes/blue/comp/emoji/';
let emoji = new Emoji(emojiRoot);

/**
 * VForm
 * @author mmzhou
 */
function format(text) {
    let context = {
        props: {
            text: text
        }
    };

    let HTML = context.props.text || '';
    let isMobile = context.props.mobile || false;

    let st = '$$$';

    HTML = HTML.replace(/\[f_(\d*?)\]/g, function ($0, $1) {
        return `${st}[$${qqemojiRoot
            + (isMobile ? 'qqpng/' : 'qqgif/')
            + $1
            + '.'
            + (isMobile ? 'png' : 'gif')}$]${st}`;
    });
    HTML = emoji.replace(HTML);

    const ary = HTML.split(st);
    let result = ary.map((tag) => {
        let imgMatch = /^\[\$([^\]\$]+)\$\]$/.exec(tag);
        if (imgMatch && imgMatch[1]) {
            return imgMatch[1];
        }
        return tag;
    });
    console.log(result);
};

format('123d😀😍😚😜😝🤨🤪😱🤬sada\n[f_123]');
