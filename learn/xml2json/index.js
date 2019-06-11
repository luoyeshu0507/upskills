// Changes XML to JSON
// Modified version from here: http://davidwalsh.name/convert-xml-json
function xml2json(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    // If just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
        obj = xml.childNodes[0].nodeValue;
    }
    else if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xml2json(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xml2json(item));
            }
        }
    }
    return obj;
}

function xmlString2xml(txt) {
  if (window.DOMParser) {
    // code for modern browsers
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt,"text/xml");
  } else {
    // code for old IE browsers
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(txt); 
  }
  return xmlDoc;
}

function xmlString2json(txt) {
  return xml2json(xmlString2xml(txt));
}

var txt = `<config>
    <!-- 被测服务器的ip信息 -->
    <ipinfo>
        <protocol x="1">http</protocol>
        <ip>172.31.31.100</ip>
        <port>8100</port>
    </ipinfo>
    
    <!-- 被测服务器的db信息 -->
    <dbinfo>
        <dbip>172.31.31.100</dbip>
        <dbport>3306</dbport>
        <dbname>p2p3</dbname>
        <dbuser>root</dbuser>
        <dbpasswd>123456</dbpasswd>
    </dbinfo>
    
    <!-- 浏览器驱动类型相关信息，驱动默认已经添加到Path中 -->
    <browserinfo>
        <default>chrome</default>
        <type>ie,firefox,chrome</type>
    </browserinfo>
    
    <!-- 智能等待超时时间 -->
    <timeout>10</timeout>
    
    <!-- 默认速度 -->
    <defaultspeed>0</defaultspeed>
    <!-- 异常时，放慢速度：实例化SeleniumDriver类时需要指明type的类型。数字也大，速度越慢，为1则表示放慢1秒 -->
    <exceptspeed>3</exceptspeed>
</config>`;
var result = xmlString2json(txt);
console.log(result);
