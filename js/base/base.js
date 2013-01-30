/*if(!console)
	var console = {log: function(){
		if(document.getElementById("console").length === 0){
			var cnt = document.createElement("div");
			document.body.i
			}


		}};
*/


/**
 * @NAME: Cross-browser TextStorage
 * @DESC: localStorage solution
 */
typeof window.localStorage == 'undefined' && ~function(){

    var localStorage = window.localStorage = {},
        prefix = 'data-userdata',
        doc = document,
        attrSrc = doc.body,
        html = doc.documentElement,

        // save attributeNames to <html>'s
        // data-userdata attribute
        mark = function(key, isRemove, temp, reg){

            html.load(prefix);
            temp = html.getAttribute(prefix);
            reg = RegExp('\\b' + key + '\\b,?', 'i');

            hasKey = reg.test(temp) ? 1 : 0;

            temp = isRemove ? temp.replace(reg, '').replace(',', '') :
                    hasKey ? temp : temp === '' ? key :
                        temp.split(',').concat(key).join(',');

            html.setAttribute(prefix, temp);
            html.save(prefix);

        };

    // add IE behavior support
    attrSrc.addBehavior('#default#userData');
    html.addBehavior('#default#userData');

    //
    localStorage.getItem = function(key){
        attrSrc.load(key);
        return attrSrc.getAttribute(key);
    };

    localStorage.setItem = function(key, value){
        attrSrc.setAttribute(key, value);
        attrSrc.save(key);
        mark(key);
    };

    localStorage.removeItem = function(key){
        attrSrc.removeAttribute(key);
        attrSrc.save(key);
        mark(key, 1);
    };

    // clear all attributes on <body> that using for textStorage
    // and clearing them from the 'data-userdata' attribute's value of <html>
    localStorage.clear = function(){

        html.load(prefix);

        var attrs = html.getAttribute(prefix).split(','),
            len = attrs.length;

        for(var i=0;i<len;i++){
            attrSrc.removeAttribute(attrs[i]);
            attrSrc.save(attrs[i]);
        };

        html.setAttribute(prefix,'');
        html.save(prefix);

    };

}();

/**
 * @Desc: icinfo
 */
var I,
    icinfo = I = icinfo || {version: "1.0.0.0"};


/**
 * 操作url的方�?
 * @namespace icinfo.url
 */
icinfo.url = icinfo.url || {};

/**
 * 操作字符串的方法
 * @namespace icinfo.string
 */
icinfo.string = icinfo.string || {};


/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义�?
 * @name icinfo.string.escapeReg
 * @function
 * @grammar icinfo.string.escapeReg(source)
 * @param {string} source 目标字符�?
 * @remark
 * 给以下字符前加上“\”进行转义：.*+?^=!:${}()|[]/\
 * @meta standard
 *
 * @returns {string} 转义后的字符�?
 */
icinfo.string.escapeReg = function (source) {
    return String(source)
            .replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
};


/**
 * 根据参数名从目标URL中获取参数�?
 * @name icinfo.url.getQueryValue
 * @function
 * @grammar icinfo.url.getQueryValue(url, key)
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数�?
 * @meta standard
 * @see icinfo.url.jsonToQuery
 *
 * @returns {string|null} - 获取的参数�?，其中URI编码后的字符不会被解码，获取不到时返回null
 */
icinfo.url.getQueryValue = function (url, key) {
    var reg = new RegExp(
                        "(^|&|\\?|#)"
                        + icinfo.string.escapeReg(key)
                        + "=([^&#]*)(&|\x24|#)",
                    "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }

    return null;
};

/**
 * 操作number的方�?
 * @namespace icinfo.number
 */
icinfo.number = icinfo.number || {};


/**
 * 为目标数字添加�?号分�?
 * @name icinfo.number.comma
 * @function
 * @grammar icinfo.number.comma(source[, length])
 * @param {number} source �?��处理的数�?
 * @param {number} [length] 两次逗号之间的数字位数，默认�?�?
 *
 * @returns {string} 添加逗号分隔后的字符�?
 */
icinfo.number.comma = function (source, length) {
    if (!length || length < 1) {
        length = 3;
    }

    source = String(source).split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
    return source.join(".");
};


/**
 * 操作cookie的方�?
 * @namespace icinfo.cookie
 */
icinfo.cookie = icinfo.cookie || {};


/**
 * 验证字符串是否合法的cookie键名
 *
 * @param {string} source �?��遍历的数�?
 * @meta standard
 * @return {boolean} 是否合法的cookie键名
 */
icinfo.cookie._isValidKey = function (key) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

/**
 * 设置cookie的�?，用encodeURIComponent进行编码
 * @name icinfo.cookie.set
 * @function
 * @grammar icinfo.cookie.set(key, value[, options])
 * @param {string} key �?��设置Cookie的键�?
 * @param {string} value �?��设置Cookie的�?
 * @param {Object} [options] 设置Cookie的其他可选参�?
 * @config {string} [path] cookie路径
 * @config {Date|number} [expires] cookie过期时间,如果类型是数字的�? 单位是毫�?
 * @config {string} [domain] cookie域名
 * @config {string} [secure] cookie是否安全传输
 * @remark
 *
1. <b>注意�?/b>该方法会对cookie值进行encodeURIComponent编码。如果想设置cookie源字符串，请使用setRaw方法�?br><br>
2. <b>options参数包括�?/b><br>
path:cookie路径<br>
expires:cookie过期时间，Number型，单位为毫秒�?<br>
domain:cookie域名<br>
secure:cookie是否安全传输

 * @meta standard
 * @see icinfo.cookie.setRaw,icinfo.cookie.get
 */
icinfo.cookie.set = function (key, value, options) {
    icinfo.cookie.setRaw(key, encodeURIComponent(value), options);
};

/**
 * 获取cookie的�?，用decodeURIComponent进行解码
 * @name icinfo.cookie.get
 * @function
 * @grammar icinfo.cookie.get(key)
 * @param {string} key �?��获取Cookie的键�?
 * @remark
 * <b>注意�?/b>该方法会对cookie值进行decodeURIComponent解码。如果想获得cookie源字符串，请使用getRaw方法�?
 * @meta standard
 * @see icinfo.cookie.getRaw,icinfo.cookie.set
 *
 * @returns {string|null} cookie的�?，获取不到时返回null
 */
icinfo.cookie.get = function (key) {
    var value = icinfo.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};


/**
 * 获取cookie的�?，不对�?进行解码
 * @name icinfo.cookie.getRaw
 * @function
 * @grammar icinfo.cookie.getRaw(key)
 * @param {string} key �?��获取Cookie的键�?
 * @meta standard
 * @see icinfo.cookie.get,icinfo.cookie.setRaw
 *
 * @returns {string|null} 获取的Cookie值，获取不到时返回null
 */
icinfo.cookie.getRaw = function (key) {
    if (icinfo.cookie._isValidKey(key)) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);

        if (result) {
            return result[2] || null;
        }
    }

    return null;
};

/**
 * 设置cookie的�?，不对�?进行编码
 * @name icinfo.cookie.setRaw
 * @function
 * @grammar icinfo.cookie.setRaw(key, value[, options])
 * @param {string} key �?��设置Cookie的键�?
 * @param {string} value �?��设置Cookie的�?
 * @param {Object} [options] 设置Cookie的其他可选参�?
 * @config {string} [path] cookie路径
 * @config {Date|number} [expires] cookie过期时间,如果类型是数字的�? 单位是毫�?
 * @config {string} [domain] cookie域名
 * @config {string} [secure] cookie是否安全传输
 * @remark
 *
<b>options参数包括�?/b><br>
path:cookie路径<br>
expires:cookie过期时间，Number型，单位为毫秒�?<br>
domain:cookie域名<br>
secure:cookie是否安全传输

 * @meta standard
 * @see icinfo.cookie.set,icinfo.cookie.getRaw
 */
icinfo.cookie.setRaw = function (key, value, options) {
    if (!icinfo.cookie._isValidKey(key)) {
        return;
    }

    options = options || {};
    //options.path = options.path || "/"; // meizz 20100402 设定�?��初始值，方便后续的操�?
    //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的

    // 计算cookie过期时间
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }

    document.cookie =
        key + "=" + value
        + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "")
        + (options.secure ? "; secure" : '');
};


/**
 * 删除cookie的�?
 * @name icinfo.cookie.remove
 * @function
 * @grammar icinfo.cookie.remove(key, options)
 * @param {string} key �?��删除Cookie的键�?
 * @param {Object} options �?��删除的cookie对应�?path domain 等�?
 * @meta standard
 */
icinfo.cookie.remove = function (key, options) {
    options = options || {};
    options.expires = new Date(0);
    icinfo.cookie.setRaw(key, '', options);
};



/**
 * 提供对浏览器处理浏览历史的功�?
 * @namespace icinfo.history
 */
icinfo.history = icinfo.history || {};

/**
 * 判断浏览器类型和特�?的属�?
 * @namespace icinfo.browser
 */
icinfo.browser = icinfo.browser || {};


//IE 8下，以documentMode为准
//在百度模板中，可能会�?，防止冲突，�?1 写成 \x241
/**
 * 判断是否为ie浏览�?
 * @name icinfo.browser.ie
 * @field
 * @grammar icinfo.browser.ie
 * @returns {Number} IE版本�?
 */
icinfo.browser.ie = icinfo.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

/**
 * 判断是否为firefox浏览�?
 * @property firefox firefox版本�?
 * @grammar icinfo.browser.firefox
 * @meta standard
 * @see icinfo.browser.ie,icinfo.browser.safari,icinfo.browser.opera,icinfo.browser.chrome
 * @return {Number} firefox版本�?
 */
icinfo.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

/**
 * 通过hash值的来记录页面的状�?
 * 通过js改变hash的时候，浏览器会增加历史记录，并且执行回调函�?
 * @name icinfo.history.listen
 * @function
 * @grammar icinfo.history.listen(callback)
 * @param {Function} callBack hash值变更时的回调函�?
 */
(function() {

    var _curHash,       //当前hash值，用来判断hash变化
        _frame,
        _callbackFun;   //hash变化时的回调函数

    /**
     * 用于IE更新iframe的hash�?
     * @private
     * @param {String} hash
     */
    function _addHistory(hash) {
        var fdoc = _frame.contentWindow.document;
        hash = hash || '#';

        //通过open方法触发frame的onload
        fdoc.open();
        fdoc.write('\<script\>window.top.location.hash="' + hash + '";\</script\>');
        fdoc.close();
        fdoc.location.hash = hash;
    };

    /**
     * @private
     * 执行回调函数并改边hash�?
     */
    function _hashChangeCallBack() {

        _callbackFun && _callbackFun();
        //设置当前的hash值，防止轮询再次监听到hash变化
        _curHash = (window.location.hash.replace(/^#/, '') || '');
    };

    /**
     * 判断hash是否变化
     * @private
     */
    function _checkHash() {

        var hash = location.hash.replace(/^#/, '');
        if (hash != _curHash) {
            //如果frame存在通过frame的onload事件来触发回调方法，如果不存在直接执行回调函�?
            _frame ? _addHistory(hash) : _hashChangeCallBack();
        }
    };


    function listen(callBack) {
        _curHash = ('');
        if (callBack)
            _callbackFun = callBack;

        if (icinfo.browser.ie) {

            //IE下�?过创建frame来增加history
            _frame = document.createElement('iframe');
            _frame.style.display = 'none';
            document.body.appendChild(_frame);

            _addHistory(window.location.hash);
            //通过frame的onload事件触发回调函数
            _frame.attachEvent('onload', function() {
                _hashChangeCallBack();
            });
            setInterval(_checkHash, 100);

        }else if (icinfo.browser.firefox < 3.6) {
            //ff3.5以下版本hash变化会自动增加历史记录，只需轮询监听hash变化调用回调函数
            setInterval(_checkHash, 100);

        }else {
            if (_curHash != location.hash.replace(/^#/, ''))
                _curHash = (window.location.hash.replace(/^#/, '') || '');

            //ff3.6 chrome safari oprea11通过onhashchange实现
            window.onhashchange = _hashChangeCallBack;
        }
    };

    icinfo.history.listen = listen;
})();













