function jsonToJsonx(json, depth, name) {
    var jsonx = '';
    if (typeof(depth) == 'undefined') depth = 0;
    if (depth == 0) {
        jsonx += '<?xml version="1.0" encoding="UTF-8"?>'+"\n";
    }
    var prefixSpaces = (new Array(depth+1)).join('    ');
    if (typeof(name) != 'undefined') {
        var nameAttr = ' name="'+name+'"';
    } else {
        var nameAttr = '';
    }
    if (depth == 0) {
        var extraAttrs = nameAttr + ' xsi:schemaLocation="http://www.datapower.com/schemas/json jsonx.xsd"';
        extraAttrs += ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
        extraAttrs += ' xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx"';
    } else {
        var extraAttrs = nameAttr;
    }
    if (typeof(json) == 'object') {
        if (Array.isArray(json)) {
            // array
            jsonx += prefixSpaces + '<json:array'+extraAttrs+'>'+"\n";
            for (var i in json) {
                var v = json[i];
                jsonx += jsonToJsonx(v, depth+1);
            }
            jsonx += prefixSpaces + '</json:array>'+"\n";
        } else {
            // object
            jsonx += prefixSpaces + '<json:object'+extraAttrs+'>'+"\n";
            for (var k in json) {
                var v = json[k];
                jsonx += jsonToJsonx(v, depth+1, k);
            }
            jsonx += prefixSpaces + '</json:object>'+"\n";
        }
    } else if (typeof(json) == 'string') {
        jsonx += ''+prefixSpaces + '<json:string'+extraAttrs+'>'+json+'</json:string>'+"\n";
    } else if (typeof(json) == 'number') {
        jsonx += ''+prefixSpaces + '<json:number'+extraAttrs+'>'+json+'</json:number>'+"\n";
    } else {
        throw(TypeError('invalid type in json'));
    }
    return jsonx;
}

function jsonxToJsonml(jsonx) {
    return JsonML.fromXMLText(jsonx);
}
