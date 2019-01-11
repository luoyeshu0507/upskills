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

var txt = `<?xml version='1.0' encoding='UTF-8' ?>
 <result>
   <info>
      <id>1</id>
      <type>HL</type>
      <ven>DEMOMA</ven>
   </info>
   <info>
      <id>2</id>
      <type>HL</type>
      <ven>DEMOMB</ven>
   </info>
<result>`;
var result = xmlString2json(txt);
console.log(result);
