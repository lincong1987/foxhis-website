/*!
 * The Icinfo Javascript Lite Lib Red Star.
 *
 * http://www.icinfo.com.cn
 *
 * editor lc
 * date 2012-8-14 17:30:04
 *
 * based on baidu tangram 1.5.2.2
 * http://tangram.baidu.com
 */

/**
 * @type icinfo
 */
var R, icinfo = R = icinfo || {
    version: "1.0.0",
    PERIOD: ".",
    debug: false,
    noop: function() {}
};

window.console = window.console || {
    log: function() {
    //        if(icinfo.debug === false){
    //            return;
    //        }
    //        var args = Array.prototype.slice.call(arguments);
    //        if(!this.logElement){
    //            var logElement = document.createElement("textarea");
    //            document.insertBefore(logElement);
    //            this.logElement = logElement;
    //        }
    //        this.logElement.innerText = this.logElement.innerText + "\n INFO: " + args.join(", ");
    }
};

icinfo.namespace = function(){
    var a = arguments, o, i = 0, j, d, arg;

    for (; i < a.length; i++) {
        o = this; //Reset base object per argument or it will get reused from the last
        arg = a[i];
        if (arg.indexOf(this.PERIOD) > -1) { //Skip this if no "." is present
            d = arg.split(this.PERIOD);
            for (j = (d[0] == 'icinfo') ? 1 : 0; j < d.length; j++) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        } else {
            o[arg] = o[arg] || {};
            o = o[arg]; //Reset base object to the new object so it's returned
        }
    }
    return o;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace string///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �����ַ����ķ���
 * @namespace icinfo.string
 */
icinfo.string = icinfo.string || {};

/**
 * ɾ��Ŀ���ַ������˵Ŀհ��ַ�
 * @name icinfo.string.trim
 * @function
 * @grammar icinfo.string.trim(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 * ��֧��ɾ������հ��ַ�
 * @shortcut trim
 * @meta standard
 *
 * @returns {string} ɾ�����˿հ��ַ�����ַ���
 */
icinfo.string.trim = function(source) {
    return String(source).replace(new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"), "");
};

icinfo.trim = icinfo.string.trim;

/**
 * ��ȡĿ���ַ�����gbk�����µ��ֽڳ���
 * @name icinfo.string.byteLength
 * @function
 * @grammar icinfo.string.byteLength(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 * ��ȡ�ַ���gbk�����µ��ֽڳ���, ʵ��ԭ������Ϊ����127�ľ�һ����˫�ֽڡ�����ַ�����gbk���뷶Χ, ��������㲻׼ȷ
 * @meta standard
 * @see icinfo.string.byteSubstr
 *
 * @returns {number} �ֽڳ���
 */
icinfo.string.byteLength = function(source) {
    return String(source).replace(/[^\x00-\xff]/g, "ci").length;
};

icinfo.byteLength = icinfo.string.byteLength;

/**
 * ��Ŀ���ַ�����gbk�����ȡ�ֽڳ���
 * @name icinfo.string.byteSubstr
 * @function
 * @grammar icinfo.string.byteSubstr(source, length)
 * @param {string} source Ŀ���ַ���
 * @param {number} length ��Ҫ��ȡ���ֽڳ���
 * @param {string} [tail] ׷���ַ���,��ѡ.
 * @remark
 * ��ȡ������,�����������ʱ,����ȡ����
 * @see icinfo.string.byteLength
 *
 * @returns {string} �ַ�����ȡ���
 */
icinfo.string.byteSubstr = function(source, length, tail) {
    source = String(source);
    tail = tail || '';
    if (length < 0 || icinfo.string.byteLength(source) <= length) {
        return source + tail;
    }

    source = source.substr(0, length).replace(/([^\x00-\xff])/g, "\x241 ")//˫�ֽ��ַ��滻������
    .substr(0, length)//��ȡ����
    .replace(/[^\x00-\xff]$/, "")//ȥ���ٽ�˫�ֽ��ַ�
    .replace(/([^\x00-\xff]) /g, "\x241");//��ԭ
    return source + tail;
};

icinfo.byteSubstr = icinfo.string.byteSubstr;

/**
 * ��Ŀ���ַ��������շ廯����
 * @name icinfo.string.toCamelCase
 * @function
 * @grammar icinfo.string.toCamelCase(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 * ֧�ֵ����ԡ�-_���ָ�
 * @meta standard
 *
 * @return {string} �շ廯�������ַ���
 */
icinfo.string.toCamel = function(source) {
    //��ǰ�ж�,���getStyle�ȵ�Ч�� thanks xianwei
    if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source;
    }
    return source.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase();
    });
};

icinfo.toCamel = icinfo.string.toCamel;

/**
 * ��Ŀ���ַ�������html����
 * @name icinfo.string.decodeHTML
 * @function
 * @grammar icinfo.string.decodeHTML(source)
 * @param {string} source Ŀ���ַ���
 * @shortcut decodeHTML
 * @meta standard
 * @see icinfo.string.encodeHTML
 *
 * @returns {string} html�������ַ���
 */
icinfo.string.decodeHTML = function(source) {
    var str = String(source)
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, "&");
    //����ת������ĺ�ʵ���ַ�
    return str.replace(/&#([\d]+);/g, function(_0, _1) {
        return String.fromCharCode(parseInt(_1, 10));
    });
};

icinfo.decodeHTML = icinfo.string.decodeHTML;

/**
 * ��Ŀ���ַ�������html����
 * @name icinfo.string.encodeHTML
 * @function
 * @grammar icinfo.string.encodeHTML(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 * �����ַ���5��:&<>"'
 * @shortcut encodeHTML
 * @meta standard
 * @see icinfo.string.decodeHTML
 *
 * @returns {string} html�������ַ���
 */
icinfo.string.encodeHTML = function(source) {
    return String(source)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

icinfo.encodeHTML = icinfo.string.encodeHTML;

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace array////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * icinfo.array
 */
icinfo.array = icinfo.array || {};

/**
 * ��ѯ������ָ��Ԫ�ص�����λ��
 * @param {Array} source ��Ҫ��ѯ������
 * @param {Any} match ��ѯ��
 * @param {number} [fromIndex] ��ѯ����ʼλ����λ��,���Ϊ����,���source.length+fromIndex����ʼ����
 */
icinfo.array.indexOf = function(source, match, fromIndex) {
    var len = source.length,
    iterator = match;

    fromIndex = fromIndex | 0;
    if (fromIndex < 0) {//С��0
        fromIndex = Math.max(0, len + fromIndex);
    }
    for (; fromIndex < len; fromIndex++) {
        if (fromIndex in source && source[fromIndex] === match) {
            return fromIndex;
        }
    }

    return -1;
};

/**
 * icinfo.array.contains
 * �ж�һ���������Ƿ��������Ԫ��
 * @param {Array} source ��Ҫ��ѯ������
 * @param {Any} obj ��ѯ��
 */
icinfo.array.contains = function(source, obj) {
    return (icinfo.array.indexOf(source, obj) >= 0);
};

/**
 * ���������е���ͬ��������Ԫ����ͬ,��ɾ����һ��Ԫ�ء�
 * @name icinfo.array.unique
 * @function
 * @grammar icinfo.array.unique(source[, compareFn])
 * @param {Array} source ��Ҫ������ͬ�������
 * @param {Function} [compareFn] �Ƚ������������Ƿ���ͬ�ĺ���,������������Ϊ�����Ĳ�����
 *
 * @returns {Array} ���˺��������
 */
icinfo.array.unique = function(source, compareFn) {
    var len = source.length,
    result = source.slice(0),
    i, datum;

    if ('function' !== typeof compareFn) {
        compareFn = function(item1, item2) {
            return item1 === item2;
        };
    }

    // �Ӻ���ǰ˫��ѭ���Ƚ�
    // �������Ԫ����ͬ,ɾ����һ��
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (compareFn(datum, result[i])) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
};

/**
 * ��������������ϲ���һ������hashMap�ṹ�Ķ���,�������ʹ�õ�һ��������Ϊkey,ʹ�õڶ���������Ϊֵ,����ڶ�������δָ��,��Ѷ��������ֵ��Ϊtrue��
 * @name icinfo.array.hash
 * @function
 * @grammar icinfo.array.hash(keys[, values])
 * @param {Array} keys ��Ϊkey������
 * @param {Array} [values] ��Ϊvalue������,δָ���˲���ʱ,Ĭ��ֵ�������ֵ����Ϊtrue��
 *
 * @returns {Object} �ϲ���Ķ���{key : value}
 */
icinfo.array.hash = function(keys, values) {
    var o = {}, vl = values && values.length, i = 0, l = keys.length;
    for (; i < l; i++) {
        o[keys[i]] = (vl && vl > i) ? values[i] : true;
    }
    return o;
};

/**
 * �Ƴ������е���
 * @name icinfo.array.remove
 * @function
 * @grammar icinfo.array.remove(source, match)
 * @param {Array} source ��Ҫ�Ƴ��������
 * @param {Any} match Ҫ�Ƴ�����
 * @meta standard
 * @see icinfo.array.removeAt
 *
 * @returns {Array} �Ƴ��������
 */
icinfo.array.remove = function(source, match) {
    var len = source.length;

    while (len--) {
        if (len in source && source[len] === match) {
            source.splice(len, 1);
        }
    }
    return source;
};

/**
 * ��������������Ԫ��,��ÿһ��Ԫ��Ӧ�÷������кϲ�,�����غϲ���Ľ����
 * @name icinfo.array.reduce
 * @function
 * @grammar icinfo.array.reduce(source, iterator[, initializer])
 * @param {Array}    source ��Ҫ����������.
 * @param {Function} iterator ��ÿ������Ԫ�ؽ��д���ĺ���,���������ĸ�����:��һ��reduce�Ľ��(���ʼֵ),��ǰԪ��ֵ,����ֵ,��������.
 * @param {Object}   [initializer] �ϲ��ĳ�ʼ��,���û�д˲���,Ĭ���������еĵ�һ��ֵ��Ϊ��ʼֵ.
 * @return {Array} reduce���ֵ.
 * @see icinfo.array.reduce
 */
icinfo.array.reduce = function(source, iterator, initializer) {
    var i = 0,
    l = source.length,
    found = 0;

    if (arguments.length < 3) {
        //û��initializer�����,�ҵ���һ�����õ�ֵ
        for (; i < l; i++) {
            initializer = source[i++];
            found = 1;
            break;
        }
        if (!found) {
            return;
        }
    }

    for (; i < l; i++) {
        if (i in source) {
            initializer = iterator(initializer, source[i], i, source);
        }
    }
    return initializer;
};

/**
 * ��������������Ԫ��,��ÿһ��Ԫ��Ӧ�÷�������ת��,������ת����������顣
 * @name icinfo.array.map
 * @function
 * @grammar icinfo.array.map(source, iterator[, thisObject])
 * @param {Array}    source   ��Ҫ����������.
 * @param {Function} iterator ��ÿ������Ԫ�ؽ��д���ĺ���.
 * @param {Object} [thisObject] ��������ʱ��thisָ��,���û�д˲���,Ĭ���ǵ�ǰ����������
 * @return {Array} map�������.
 * @see icinfo.array.reduce
 */
icinfo.array.map = function(source, iterator, thisObject) {
    var results = [],
    i = 0,
    l = source.length;
    for (; i < l; i++) {
        results[i] = iterator.call(thisObject || source, source[i], i);
    }
    return results;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace cookie///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ����cookie�ķ���
 * @namespace icinfo.cookie
 */
icinfo.cookie = icinfo.cookie || {};

/**
 * ��֤�ַ����Ƿ�Ϸ���cookie����
 *
 * @param {string} key ��Ҫ����������
 * @meta standard
 * @return {boolean} �Ƿ�Ϸ���cookie����
 */
icinfo.cookie._isValidKey = function(key) {
    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

/**
 * ����cookie��ֵ,����ֵ���б���
 * @name icinfo.cookie.setRaw
 * @function
 * @grammar icinfo.cookie.setRaw(key, value[, options])
 * @param {string} key ��Ҫ����Cookie�ļ���
 * @param {string} value ��Ҫ����Cookie��ֵ
 * @param {Object} [options] ����Cookie��������ѡ����
 * @config {string} [path] cookie·��
 * @config {Date|number} [expires] cookie����ʱ��,������������ֵĻ�, ��λ�Ǻ���
 * @config {string} [domain] cookie����
 * @config {string} [secure] cookie�Ƿ�ȫ����
 * @remark
 *
 <b>options��������:</b><br>
 path:cookie·��<br>
 expires:cookie����ʱ��,Number��,��λΪ���롣<br>
 domain:cookie����<br>
 secure:cookie�Ƿ�ȫ����

 * @meta standard
 * @see icinfo.cookie.set,icinfo.cookie.getRaw
 */
icinfo.cookie.setRaw = function(key, value, options) {
    if (!icinfo.cookie._isValidKey(key)) {
        return;
    }

    options = options || {};

    // ����cookie����ʱ��
    var expires = options.expires;
    if ('number' === typeof options.expires) {
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
 * ����cookie��ֵ,��encodeURIComponent���б���
 * @name icinfo.cookie.set
 * @function
 * @grammar icinfo.cookie.set(key, value[, options])
 * @param {string} key ��Ҫ����Cookie�ļ���
 * @param {string} value ��Ҫ����Cookie��ֵ
 * @param {Object} [options] ����Cookie��������ѡ����
 * @config {string} [path] cookie·��
 * @config {Date|number} [expires] cookie����ʱ��,������������ֵĻ�, ��λ�Ǻ���
 * @config {string} [domain] cookie����
 * @config {string} [secure] cookie�Ƿ�ȫ����
 * @remark
 *
 1. <b>ע��:</b>�÷������cookieֵ����encodeURIComponent���롣���������cookieԴ�ַ���,��ʹ��setRaw������<br><br>
 2. <b>options��������:</b><br>
 path:cookie·��<br>
 expires:cookie����ʱ��,Number��,��λΪ���롣<br>
 domain:cookie����<br>
 secure:cookie�Ƿ�ȫ����

 * @meta standard
 * @see icinfo.cookie.setRaw,icinfo.cookie.get
 */
icinfo.cookie.set = function(key, value, options) {
    icinfo.cookie.setRaw(key, encodeURIComponent(value), options);
};

/**
 * ��ȡcookie��ֵ,����ֵ���н���
 * @name icinfo.cookie.getRaw
 * @function
 * @grammar icinfo.cookie.getRaw(key)
 * @param {string} key ��Ҫ��ȡCookie�ļ���
 * @meta standard
 * @see icinfo.cookie.get,icinfo.cookie.setRaw
 *
 * @returns {string|null} ��ȡ��Cookieֵ,��ȡ����ʱ����null
 */
icinfo.cookie.getRaw = function(key) {
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
 * ��ȡcookie��ֵ,��decodeURIComponent���н���
 * @name icinfo.cookie.get
 * @function
 * @grammar icinfo.cookie.get(key)
 * @param {string} key ��Ҫ��ȡCookie�ļ���
 * @remark
 * <b>ע��:</b>�÷������cookieֵ����decodeURIComponent���롣�������cookieԴ�ַ���,��ʹ��getRaw������
 * @meta standard
 * @see icinfo.cookie.getRaw,icinfo.cookie.set
 *
 * @returns {string|null} cookie��ֵ,��ȡ����ʱ����null
 */
icinfo.cookie.get = function(key) {
    var value = icinfo.cookie.getRaw(key);
    if ('string' === typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace date///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �������ڵķ���
 * @namespace icinfo.date
 */
icinfo.date = icinfo.date || {};

/**
 * ��ȡ��ǰʱ���
 * @return ʱ���
 */
icinfo.date.now = function() {
    return (new Date()).getTime();
};
icinfo.now = icinfo.date.now;

/**
 * ��Ŀ���ַ���ת�������ڶ���
 * @name icinfo.date.parse
 * @function
 * @grammar icinfo.date.parse(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 *
 ����Ŀ���ַ���,������Щ��������� parse �����ܹ��ɹ��ؽ���: <br>
 <ol>
 <li>�����ڿ���ʹ�á�/����-����Ϊ���ڷָ���,���Ǳ�������/��/��ĸ�ʽ����ʾ,����"7/20/96"��</li>
 <li>�� "July 10 1995" ��ʽ��ʾ�ĳ������е��ꡢ�¡��տ��԰��κ�˳������,���ֵ������ 2 λ���ֱ�ʾҲ������ 4 λ���ֱ�ʾ�����ʹ�� 2 λ��������ʾ���,��ô����ݱ�����ڻ���� 70�� </li>
 <li>�����е��κ��ı�������Ϊע�͡���Щ���ſ���Ƕ��ʹ�á� </li>
 <li>���źͿո���Ϊ�ָ���������ʹ�ö���ָ����� </li>
 <li>�º��յ����Ʊ�������������������ϵ��ַ�����������ַ�����ɵ����Ʋ��Ƕ�һ�޶���,��ô�����ƾͱ����������һ�������������»��ա�����,"Ju" ������Ϊ���¶��������¡� </li>
 <li>�����ṩ��������,�����ָ�������ڼ���ֵ�밴�ո�������ʣ�ಿ����ȷ�������ڼ���ֵ������,��ô��ָ��ֵ�ͻᱻ���ԡ�����,���� 1996 �� 11 �� 9 ��ʵ������������,"Tuesday November 9 1996" Ҳ���ǿ��Ա����ܲ����н����ġ����ǽ�� date �����а������� "Friday November 9 1996"�� </li>
 <li>JScript �������еı�׼ʱ��,�Լ�ȫ���׼ʱ�� (UTC) �͸������α�׼ʱ�� (GMT)��</li>
 <li>Сʱ�����ӡ�������֮����ð�ŷָ�,���ܲ����������Ҫָ����"10:"��"10:11"���� "10:11:12" ������Ч�ġ� </li>
 <li>���ʹ�� 24 Сʱ��ʱ��ʱ��,��ôΪ���� 12 ��֮���ʱ��ָ�� "PM" �Ǵ���ġ����� "23:15 PM" ���Ǵ���ġ�</li>
 <li>������Ч���ڵ��ַ����Ǵ���ġ�����,һ��������������ݻ������·ݵ��ַ������Ǵ���ġ�</li>
 </ol>

 *
 * @returns {Date} ת��������ڶ���
 */

icinfo.date.parse = function(source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' === typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
            d1 = d.length > 1
            ? d[1].split(/[^\d]/)
            : [0, 0, 0],
            d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0,
                d0[1] - 1,
                d0[2] - 0,
                d1[0] - 0,
                d1[1] - 0,
                d1[2] - 0);
        } else {
            return new Date(source);
        }
    }

    return new Date();
};

/**
 * ���ڸ�ʽ������
 * @param {Object} options ��������
 * <br>
 * options = {
 * date:"",
 * dateObj:"",
 * time:"",
 * format:""
 * }
 * @example options.format {Object} ��ʽ��ģ��
 * {yyyy}   ���    4λ         ��1900��ʼ      1900 -
 * {yyy}    ���    3λ         ��1900��ʼ      0 -
 * {M}      �·�                ���Զ���0       1 - 12
 * {MM}     �·�                �Զ���0         01-12
 * {MMM}    �·�    Ӣ���·ݵ���д		Jan to Dec
 * {MMMM}   �·�    Ӣ���·ݵ�ȫ��		January to December
 * {MC}     ��      ����
 * {MCS}    ��      ���� ��
 * {dd}     ����    �Զ���0
 * {D}      ����    ���Զ���0       01 - 31
 * {HH}     Сʱ    01 - 23
 * {H}      Сʱ    1 - 23
 * {mm}     ����    00 - 59
 * {m}      ����    1 - 59
 * {ss}     ��      00 - 59
 * {s}      ��      0 - 59
 * {w}      ����    �����쵽��������	0 - 6
 * {DD}     ����    �����쵽��Ӣ��ȫ�� 	Sunday - Saturday
 * {D}      ����    �����쵽��Ӣ����д 	Sun - Sat
 * {DCL}    ����    ���� ��
 * {DC}     ����    ����
 * {DCS}    ����    ���� ��
 * ��������
 * icinfo.date.format({time: new Date, format: "{yyyy}|{yyy}, {M}|{MM}|{MMM}|{MMMM}|{MC}|{MCS}, {dd}|{D}, {HH}|{H}, {mm}|{m}, {ss}|{s}, {w}, {DD}|{D}|{DCL}|{DC}|{DCS}"})
 * ������
 * "2012|112, 7|07|Jul|July|����|��, 13|Fri, 10|10, 56|56, 27|27, 5, Friday|Fri|������|����|��"
 */
icinfo.date.format = function(options) {

    options = options || {};

    var defaults = {
        date: null,
        dateObj: null,
        time: null,
        format: "{yyyy}-{MM}-{dd}"
    };

    var opts = icinfo.extend(defaults, options);
    if (opts.date === null && opts.dateObj === null && opts.time === null) {
        return "";
    }

    var $date = null;

    if (opts.date !== null) {
        $date = icinfo.date.parse(opts.date);
    }

    if (opts.time !== null) {
        $date = new Date();
        $date.setTime(opts.time);
    }

    if (opts.dateObj !== null) {
        $date = new Date();
        if (!opts.dateObj.time) {
            return "";
        }
        $date.setTime(opts.dateObj.time);
    }

    if (!($date instanceof Date)) {
        return "";
    }

    var $week = ("Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday").split("_");
    var $weekShort = ("Sun_Mon_Tue_Wed_Thu_Fri_Sat").split("_");

    var $weekChineseLong = ("������,����һ,���ڶ�,������,������,������,������").split(",");
    var $weekChinese = ("����,��һ,�ܶ�,����,����,����,����").split(",");
    var $weekChineseShort = ("��,һ,��,��,��,��,��").split(",");

    var $month = ("January,February,March,April,May,June,July,August,September,October,November,December").split(",");
    var $monthShort = ("Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec").split(",");

    var $monthChinese = ("һ��,����,����,����,����,����,����,����,����,ʮ��,ʮһ��,ʮ����").split(",");
    var $monthChineseShort = ("һ,��,��,��,��,��,��,��,��,ʮ,ʮһ,ʮ��").split(",");

    var $fmt = {
        yyyy: $date.getFullYear().toString(),
        yyy: $date.getYear().toString(),
        //	�·�	���Զ���0			1 - 12
        M: ($date.getMonth() + 1).toString(),
        //	�·�	�Զ���0				01-12
        MM: icinfo.number.pad(($date.getMonth() + 1), 2),
        //	�·�	Ӣ���·ݵ���д		Jan to Dec
        MMM: $monthShort[$date.getMonth()],
        //	�·�	Ӣ���·ݵ�ȫ��		January to December
        MMMM: $month[$date.getMonth()],
        //	�� ����
        MC: $monthChinese[$date.getMonth()],
        //	�� ���� ��
        MCS: $monthChineseShort[$date.getMonth()],
        //	����	�Զ���0
        dd: icinfo.number.pad($date.getDate(), 2),
        //	����	���Զ���0				01 - 31
        d: $date.getDate().toString(),
        //	Сʱ	01 - 23
        HH: icinfo.number.pad($date.getHours(), 2),
        //	Сʱ	1 - 23
        H: $date.getHours().toString(),
        //	����	00 - 59
        mm: icinfo.number.pad($date.getMinutes(), 2),
        //	����	1 - 59
        m: $date.getMinutes().toString(),
        //	��		00 - 59
        ss: icinfo.number.pad($date.getSeconds(), 2),
        //	��		0 - 59
        s: $date.getSeconds().toString(),
        //	����	�����쵽��������	0 - 6
        w: $date.getDay().toString(),
        //	����	�����쵽��Ӣ��ȫ�� 	Sunday - Saturday
        DD: $week[$date.getDay()],
        //	����	�����쵽��Ӣ����д 	Sun - Sat
        D: $weekShort[$date.getDay()],
        //	���� ���� ��
        DCL: $weekChineseLong[$date.getDay()],
        //	���� ����
        DC: $weekChinese[$date.getDay()],
        //	���� ���� ��
        DCS: $weekChineseShort[$date.getDay()]
    };

    var tmp = opts.format;
    if (icinfo.trim(tmp) === "") {
        return "";
    }

    return tmp.replace(/{yyyy}/g, $fmt.yyyy)
    .replace(/{yyy}/g, $fmt.yyy)
    .replace(/{MMMM}/g, $fmt.MMMM)
    .replace(/{MMM}/g, $fmt.MMM)
    .replace(/{MM}/g, $fmt.MM)
    .replace(/{MC}/g, $fmt.MC)
    .replace(/{MCS}/g, $fmt.MCS)
    .replace(/{M}/g, $fmt.M)
    .replace(/{dd}/g, $fmt.dd)
    .replace(/{d}/g, $fmt.d)
    .replace(/{HH}/g, $fmt.HH)
    .replace(/{H}/g, $fmt.H)
    .replace(/{mm}/g, $fmt.mm)
    .replace(/{m}/g, $fmt.m)
    .replace(/{ss}/g, $fmt.ss)
    .replace(/{s}/g, $fmt.s)
    .replace(/{w}/g, $fmt.w)
    .replace(/{DD}/g, $fmt.DD)
    .replace(/{DCL}/g, $fmt.DCL)
    .replace(/{DCS}/g, $fmt.DCS)
    .replace(/{DC}/g, $fmt.DC)
    .replace(/{D}/g, $fmt.D);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace object///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ����ԭ������ķ���
 * @namespace icinfo.object
 */
icinfo.object = icinfo.object || {};

/**
 * ��Դ������������Կ�����Ŀ�������
 * @name icinfo.object.extend
 * @function
 * @grammar icinfo.object.extend(target, source)
 * @param {Object} target Ŀ�����
 * @param {Object} source Դ����
 * @see icinfo.array.merge
 * @remark
 *
 1.Ŀ�������,��Դ����key��ͬ�ĳ�Ա���ᱻ���ǡ�<br>
 2.Դ�����prototype��Ա���´����

 * @shortcut extend
 * @meta standard
 *
 * @returns {Object} Ŀ�����
 */
icinfo.object.extend = function(target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }

    return target;
};

icinfo.extend = icinfo.object.extend;

/**
 * ��ȡĿ�����ļ����б�
 * @name icinfo.object.keys
 * @function
 * @grammar icinfo.object.keys(source)
 * @param {Object} source Ŀ�����
 * @see icinfo.object.values
 *
 * @returns {Array} �����б�
 */
icinfo.object.keys = function(source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};

/**
 * ��ȡĿ������ֵ�б�
 * @name icinfo.object.values
 * @function
 * @grammar icinfo.object.values(source)
 * @param {Object} source Ŀ�����
 * @see icinfo.object.keys
 *
 * @returns {Array} ֵ�б�
 */
icinfo.object.values = function(source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};

/**
 * ����Object������Ԫ��
 * @name icinfo.object.each
 * @function
 * @grammar icinfo.object.each(source, iterator)
 * @param {Object} source ��Ҫ������Object
 * @param {Function} iterator ��ÿ��ObjectԪ�ؽ��е��õĺ���,function (item, key)
 *
 * @returns {Object} ������Object
 */
icinfo.object.each = function(source, iterator) {
    var returnValue, key, item;
    if ('function' === typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, item, key);

                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};

/**
 * ����object������Ԫ��,��ÿһ��Ԫ��Ӧ�÷�������ת��,����ת�������object��
 * @name icinfo.object.map
 * @function
 * @grammar icinfo.object.map(source, iterator)
 *
 * @param 	{Array}    source   ��Ҫ������object
 * @param 	{Function} iterator ��ÿ��objectԪ�ؽ��д���ĺ���
 * @return 	{Array} 			map���object
 */
icinfo.object.map = function(source, iterator) {
    var results = {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            results[key] = iterator(source[key], key);
        }
    }
    return results;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace number///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ����number�ķ���
 * @namespace icinfo.number
 */
icinfo.number = icinfo.number || {};

/**
 * ΪĿ��������Ӷ��ŷָ�
 * @name icinfo.number.encomma
 * @function
 * @grammar icinfo.number.encomma(source[, length])
 * @param {number} source ��Ҫ���������
 * @param {number} [length] ���ζ���֮�������λ��,Ĭ��Ϊ3λ
 *
 * @returns {string} ��Ӷ��ŷָ�����ַ���
 */
icinfo.number.encomma = function(source, length) {
    if (!length || length < 1) {
        length = 3;
    }

    source = String(source).split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
    return source.join(".");
};

/**
 * ȥ�����ֵĶ��ŷָ���
 * @param {String} source ��Ҫ���������
 */
icinfo.number.decomma = function(source) {
    return source.toString().replace(/\,|\./g, "");
};

/**
 * ��Ŀ�����ֽ���0���봦��
 * @name icinfo.number.pad
 * @function
 * @grammar icinfo.number.pad(source, length)
 * @param {number} source ��Ҫ���������
 * @param {number} length ��Ҫ����ĳ���
 *
 * @returns {string} ��Ŀ�����ֽ���0���봦���Ľ��
 */
icinfo.number.pad = function(source, length) {
    var pre = "",
    negative = (source < 0),
    string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ? "-" : "") + pre + string;
};

/**
 * �����������,��Χ��[min, max]
 * @name icinfo.number.random
 * @function
 * @grammar icinfo.number.random(min, max)
 *
 * @param 	{number} min 	�����������Сֵ
 * @param 	{number} max 	������������ֵ
 * @return 	{number} 		���ɵ��������
 */
icinfo.number.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace url//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ����url�ķ���
 * @namespace icinfo.url
 */
icinfo.url = icinfo.url || {};

/**
 * ����Ŀ��URL�еĲ�����json����
 * @name icinfo.url.parse
 * @function
 * @grammar icinfo.url.parse(url)
 * @param {string} url Ŀ��URL
 * @see icinfo.url.jsonToQuery
 *
 * @returns {Object} - ����Ϊ�������,����URI�������ַ����ᱻ����,'a=%20' ==> {a:'%20'}��
 */
icinfo.url.parse = function(url) {
    url = url || location.href;
    var query = url.substr(url.lastIndexOf('?') + 1),
    params = query.split('&'),
    len = params.length,
    result = {},
    i = 0,
    key, value, item, param;

    for (; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        param = params[i].split('=');
        key = param[0];
        value = param[1];

        item = result[key];
        if ('undefined' === typeof item) {
            result[key] = value;
        } else if (icinfo.lang.isArray(item)) {
            item.push(value);
        } else { // ����ֻ������string��
            result[key] = [item, value];
        }
    }

    return result;
};

/**
 * ���ݲ�������Ŀ��URL�л�ȡ����ֵ
 * @name icinfo.url.getParameter
 * @function
 * @grammar icinfo.url.getQueryValue(key, url)
 * @param {string} key Ҫ��ȡ�Ĳ�����
 * @param {string} url Ŀ��URL
 * @meta standard
 * @see icinfo.url.jsonToQuery
 *
 * @returns {string|null} - ��ȡ�Ĳ���ֵ,����URI�������ַ����ᱻ����,��ȡ����ʱ����null
 */
icinfo.url.getParameter = function(key, url) {
    url = url || location.href;
    var reg = new RegExp(
        "(^|&|\\?|#)"
        + key
        + "=([^&#]*)(&|\x24|#)",
        "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }

    return null;
};

/**
 * ���ַ�������%#&+=�Լ���\sƥ��������ַ�����urlת��
 * @name icinfo.url.escape
 * @function
 * @grammar icinfo.url.escape(source)
 * @param {string} source ��Ҫת����ַ���.
 * @return {string} ת��֮����ַ���.
 * @remark
 * ����get����ת�塣�ڷ�����ֻ����gbk,����ҳ����gbk����ʱ,���Ծ�����ת���ֱ�ӷ�get����
 *
 * @return {string} ת�����ַ���
 */
icinfo.url.escape = function(source) {
    return String(source).replace(/[#%&+=\/\\\ \ \f\r\n\t]/g, function(all) {
        return '%' + (0x100 + all.charCodeAt()).toString(16).substring(1).toUpperCase();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace platform/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �ж�ƽ̨���ͺ����Ե�����
 * @namespace icinfo.platform
 */
icinfo.platform = icinfo.platform || {};

/**
 * �ж��Ƿ�Ϊandroidƽ̨
 * @property android �Ƿ�Ϊandroidƽ̨
 * @grammar icinfo.platform.android
 * @meta standard
 * @see icinfo.platform.x11,icinfo.platform.windows,icinfo.platform.macintosh,icinfo.platform.iphone,icinfo.platform.ipad
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isAndroid = /android/i.test(navigator.userAgent);

/**
 * �ж��Ƿ�Ϊiphoneƽ̨
 * @property iphone �Ƿ�Ϊiphoneƽ̨
 * @grammar icinfo.platform.iphone
 * @meta standard
 * @see icinfo.platform.x11,icinfo.platform.windows,icinfo.platform.macintosh,icinfo.platform.ipad,icinfo.platform.android
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isIphone = /iphone/i.test(navigator.userAgent);

/**
 * �ж��Ƿ�Ϊx11ƽ̨
 * @property x11 �Ƿ�Ϊx11ƽ̨
 * @grammar icinfo.platform.x11
 * @meta standard
 * @see icinfo.platform.windows,icinfo.platform.macintosh,icinfo.platform.iphone,icinfo.platform.ipad,icinfo.platform.android
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isX11 = /x11/i.test(navigator.userAgent);

/**
 * �ж��Ƿ�Ϊmacintoshƽ̨
 * @property macintosh �Ƿ�Ϊmacintoshƽ̨
 * @grammar icinfo.platform.macintosh
 * @meta standard
 * @see icinfo.platform.x11,icinfo.platform.windows,icinfo.platform.iphone,icinfo.platform.ipad,icinfo.platform.android
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isMac = /macintosh/i.test(navigator.userAgent);

/**
 * �ж��Ƿ�Ϊwindowsƽ̨
 * @property windows �Ƿ�Ϊwindowsƽ̨
 * @grammar icinfo.platform.windows
 * @meta standard
 * @see icinfo.platform.x11,icinfo.platform.macintosh,icinfo.platform.iphone,icinfo.platform.ipad,icinfo.platform.android
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isWindows = /windows/i.test(navigator.userAgent);

/**
 * �ж��Ƿ�Ϊx11ƽ̨
 * @property x11 �Ƿ�Ϊx11ƽ̨
 * @grammar icinfo.platform.x11
 * @meta standard
 * @see icinfo.platform.windows,icinfo.platform.macintosh,icinfo.platform.iphone,icinfo.platform.ipad,icinfo.platform.android
 * @return {Boolean} ����ֵ
 */
icinfo.platform.isX11 = /x11/i.test(navigator.userAgent);

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace lang/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �����Բ���ķ�װ,�����жϵ�֧�֡�
 * @namespace icinfo.lang
 */
icinfo.lang = icinfo.lang || {};

/**
 * uuid
 */
icinfo.uuid = icinfo.lang.uuid = 1E8;

/**
 * �ж�Ŀ������Ƿ�Array����
 * @name icinfo.lang.isArray
 * @function
 * @grammar icinfo.lang.isArray(source)
 * @param {Any} source Ŀ�����
 * @meta standard
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isElement,icinfo.lang.isBoolean,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isArray = function(source) {
    return '[object Array]' === Object.prototype.toString.call(source);
};


/**
 * �ж�Ŀ������Ƿ�Boolean����
 * @name icinfo.lang.isBoolean
 * @function
 * @grammar icinfo.lang.isBoolean(source)
 * @param {Any} source Ŀ�����
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isElement,icinfo.lang.isArray,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isBoolean = function(source) {
    return typeof source === 'boolean';
};


/**
 * �ж�Ŀ������Ƿ�ΪDate����
 * @name icinfo.lang.isDate
 * @function
 * @grammar icinfo.lang.isDate(source)
 * @param {Any} source Ŀ�����
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isArray,icinfo.lang.isBoolean,icinfo.lang.isElement
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isDate = function(source) {
    // return o instanceof Date;
    return Object.toString.call(source) === "[object Date]" && source.toString() !== 'Invalid Date' && !isNaN(source);
};

/**
 * �ж�Ŀ������Ƿ�ΪElement����
 * @name icinfo.lang.isElement
 * @function
 * @grammar icinfo.lang.isElement(source)
 * @param {Any} source Ŀ�����
 * @meta standard
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isArray,icinfo.lang.isBoolean,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isElement = function(source) {
    return !!(source && source.nodeName && source.nodeType == 1);
};

/**
 * �ж�Ŀ������Ƿ�Ϊfunction��Functionʵ��
 * @name icinfo.lang.isFunction
 * @function
 * @grammar icinfo.lang.isFunction(source)
 * @param {Any} source Ŀ�����
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isArray,icinfo.lang.isElement,icinfo.lang.isBoolean,icinfo.lang.isDate
 * @meta standard
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isFunction = function(source) {
    // chrome��,'function' == typeof /a/ Ϊtrue.
    return '[object Function]' === Object.prototype.toString.call(source);
};
/**
 * �ж�Ŀ������Ƿ�number���ͻ�Number����
 * @name icinfo.lang.isNumber
 * @function
 * @grammar icinfo.lang.isNumber(source)
 * @param {Any} source Ŀ�����
 * @meta standard
 * @see icinfo.lang.isString,icinfo.lang.isObject,icinfo.lang.isArray,icinfo.lang.isElement,icinfo.lang.isBoolean,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 * @remark �ñ������ж�NaN�᷵��false,������Javascript����Number���͡�
 */
icinfo.lang.isNumber = function(source) {
    return '[object Number]' === Object.prototype.toString.call(source) && isFinite(source);
};

/**
 * �ж�Ŀ������Ƿ�ΪObject����
 * @name icinfo.lang.isObject
 * @function
 * @grammar icinfo.lang.isObject(source)
 * @param {Any} source Ŀ�����
 * @shortcut isObject
 * @meta standard
 * @see icinfo.lang.isString,icinfo.lang.isNumber,icinfo.lang.isArray,icinfo.lang.isElement,icinfo.lang.isBoolean,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isObject = function(source) {
    return 'function' === typeof source || !!(source && 'object' === typeof source);
};

/**
 * �ж�Ŀ������Ƿ�string���ͻ�String����
 * @name icinfo.lang.isString
 * @function
 * @grammar icinfo.lang.isString(source)
 * @param {Any} source Ŀ�����
 * @shortcut isString
 * @meta standard
 * @see icinfo.lang.isObject,icinfo.lang.isNumber,icinfo.lang.isArray,icinfo.lang.isElement,icinfo.lang.isBoolean,icinfo.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
icinfo.lang.isString = function(source) {
    return '[object String]' === Object.prototype.toString.call(source);
};

/**
 * ��һ������ת����array
 * @name icinfo.lang.toArray
 * @function
 * @grammar icinfo.lang.toArray(source)
 * @param {mix} source ��Ҫת����array�ı���
 * @meta standard
 * @returns {array} ת�����array
 */
icinfo.lang.toArray = function(source) {
    if (source === null || source === undefined)
        return [];
    if (icinfo.lang.isArray(source))
        return source;

    // The strings and functions also have 'length'
    if (typeof source.length !== 'number' || typeof source === 'string' || icinfo.lang.isFunction(source)) {
        return [source];
    }

    //nodeList, IE �µ��� [].slice.call(nodeList) �ᱨ��
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};

/**
 * �����ݷ���
 */
icinfo.isArray = icinfo.lang.isArray;
icinfo.isBoolean = icinfo.lang.isBoolean;
icinfo.isDate = icinfo.lang.isDate;
icinfo.isElement = icinfo.lang.isElement;
icinfo.isFunction = icinfo.lang.isFunction;
icinfo.isNumber = icinfo.lang.isNumber;
icinfo.isObject = icinfo.lang.isObject;
icinfo.isString = icinfo.lang.isString;
icinfo.toArray = icinfo.lang.toArray;

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace browser//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �ж���������ͺ����Ե�����
 * @namespace icinfo.browser
 */
icinfo.browser = icinfo.browser || {};

/**
 * �ж��Ƿ�Ϊie�����
 * @see !-[1,] ���������վ�Ϸ��ֵ�
 * @name icinfo.browser.ie
 * @field
 * @grammar icinfo.browser.ie
 * @returns {Number} IE�汾��
 */
icinfo.browser.ie = icinfo.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp['\x241']) : undefined;

/**
 * �ж��Ƿ�Ϊfirefox�����
 * @property firefox firefox�汾��
 * @grammar icinfo.browser.firefox
 * @meta standard
 * @see icinfo.browser.ie,icinfo.browser.safari,icinfo.browser.opera,icinfo.browser.chrome
 * @return {Number} firefox�汾��
 */
icinfo.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp['\x241'] : undefined;

/**
 * �ж��Ƿ�Ϊchrome�����
 * @grammar icinfo.browser.chrome
 * @see icinfo.browser.ie,icinfo.browser.firefox,icinfo.browser.safari,icinfo.browser.opera
 * @property chrome chrome�汾��
 * @return {Number} chrome�汾��
 */
icinfo.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp['\x241'] : undefined;

/**
 * �ж��Ƿ�Ϊgecko�ں�
 * @property isGecko
 * @grammar icinfo.browser.isGecko
 * @meta standard
 * @see icinfo.browser.isWebkit
 * @returns {Boolean} ����ֵ
 */
icinfo.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);

/**
 * �ж��Ƿ��ϸ��׼����Ⱦģʽ
 * @property isStrict
 * @grammar icinfo.browser.isStrict
 * @meta standard
 * @returns {Boolean} ����ֵ
 */
icinfo.browser.isStrict = document.compatMode === "CSS1Compat";

/**
 * �ж��Ƿ�Ϊwebkit�ں�
 * @property isWebkit
 * @grammar icinfo.browser.isWebkit
 * @meta standard
 * @see icinfo.browser.isGecko
 * @returns {Boolean} ����ֵ
 */
icinfo.browser.isWebkit = /webkit/i.test(navigator.userAgent);


try {
    if (/(\d+\.\d+)/.test(external.max_version)) {
        /**
         * �ж��Ƿ�Ϊmaxthon�����
         * @property maxthon maxthon�汾��
         * @grammar icinfo.browser.maxthon
         * @see icinfo.browser.ie
         * @returns {Number} maxthon�汾��
         */
        icinfo.browser.maxthon = +RegExp['\x241'];
    }
} catch (e) {
}

/**
 * �ж��Ƿ�Ϊopera�����
 * @property opera opera�汾��
 * @grammar icinfo.browser.opera
 * @meta standard
 * @see icinfo.browser.ie,icinfo.browser.firefox,icinfo.browser.safari,icinfo.browser.chrome
 * @returns {Number} opera�汾��
 */

/**
 * opera ��10��ʼ������opera������ַ������а汾���ж�
 * ��Browser identification������Version + ���ֽ��а汾��ʶ
 * opera��������ֱ�����9.80����
 */
icinfo.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;

/**
 * �ж��Ƿ�Ϊsafari�����, ֧��ipad
 * @property safari safari�汾��
 * @grammar icinfo.browser.safari
 * @meta standard
 * @see icinfo.browser.ie,icinfo.browser.firefox,icinfo.browser.opera,icinfo.browser.chrome
 */
icinfo.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent) ? +(RegExp['\x241'] || RegExp['\x242']) : undefined;

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace history//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * �ṩ����������������ʷ�Ĺ���
 * @namespace icinfo.history
 */
icinfo.history = icinfo.history || {};

/**
 * ͨ��hashֵ������¼ҳ���״̬
 * ͨ��js�ı�hash��ʱ��,�������������ʷ��¼,����ִ�лص�����
 * @name icinfo.history.listen
 * @function
 * @grammar icinfo.history.listen(callback)
 * @param {Function} callBack hashֵ���ʱ�Ļص�����.
 */
(function() {

    /**
     * ��ǰhashֵ,�����ж�hash�仯
     */
    var _curHash;

    /**
     * hash�仯ʱ�Ļص�����
     */
    var _callbackFun;
    var _frame;

    /**
     * ����IE����iframe��hashֵ
     * @private
     * @param {String} hash
     */
    function _addHistory(hash) {
        var fdoc = _frame.contentWindow.document;
        hash = hash || '#';

        //ͨ��open��������frame��onload
        fdoc.open();
        fdoc.write('\<script\>window.top.location.hash="' + hash + '";\</script\>');
        fdoc.close();
        fdoc.location.hash = hash;
    }

    /**
     * ִ�лص��������ı�hashֵ
     * @private
     */
    function _hashChangeCallBack() {

        _callbackFun && _callbackFun();
        //���õ�ǰ��hashֵ,��ֹ��ѯ�ٴμ�����hash�仯
        _curHash = (window.location.hash.replace(/^#/, '') || '');

        console.log("_hashChangeCallBack>>", _curHash);
    }

    /**
     * �ж�hash�Ƿ�仯
     * @private
     */
    function _checkHash() {

        var hash = location.hash.replace(/^#/, '');
        if (hash !== _curHash) {
            //���frame����ͨ��frame��onload�¼��������ص�����,���������ֱ��ִ�лص�����
            _frame ? _addHistory(hash) : _hashChangeCallBack();
        }
    }

    function listen(callBack) {
        _curHash = ('');
        if (callBack)
            _callbackFun = callBack;

        if (icinfo.browser.ie) {

            //IE��ͨ������frame������history
            _frame = document.createElement('iframe');
            _frame.style.display = 'none';
            document.body.appendChild(_frame);

            _addHistory(window.location.hash);
            //ͨ��frame��onload�¼������ص�����
            _frame.attachEvent('onload', function() {
                _hashChangeCallBack();
            });
            setInterval(_checkHash, 100);

        } else if (icinfo.browser.firefox < 3.6) {
            //ff3.5���°汾hash�仯���Զ�������ʷ��¼,ֻ����ѯ����hash�仯���ûص�����
            setInterval(_checkHash, 100);

        } else {
            if (_curHash !== location.hash.replace(/^#/, ''))
                _curHash = (window.location.hash.replace(/^#/, '') || '');

            //ff3.6 chrome safari oprea11ͨ��onhashchangeʵ��
            window.onhashchange = _hashChangeCallBack;
            console.log("icinfo.history.listen>>>", _curHash);
        }
    }

    icinfo.history.listen = listen;
})();


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace json/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
icinfo.json = icinfo.json || {};

/**
 * ���ַ���������json����ע:�����Զ�����ո�
 * @name icinfo.json.parse
 * @function
 * @grammar icinfo.json.parse(data)
 * @param {string} data ��Ҫ�������ַ���
 * @remark
 * �÷�����ʵ����ecma-262������й涨��JSON.parse��ͬ,��ʱֻ֧�ִ���һ����������������й��ܷḻ��
 * @meta standard
 * @see icinfo.json.stringify,icinfo.json.decode
 *
 * @returns {JSON} �������json����
 */
icinfo.json.parse = function(data) {
    return (new Function("return (" + data + ")"))();
};


/**
 * ���ַ���������json����,Ϊ��ʱ�ӿ�,���ᱻicinfo.json.parse����
 * @name icinfo.json.decode
 * @function
 * @grammar icinfo.json.decode(source)
 * @param {string} source ��Ҫ�������ַ���
 * @meta out
 * @see icinfo.json.encode,icinfo.json.parse
 *
 * @returns {JSON} �������json����
 */
icinfo.json.decode = icinfo.json.parse;

/**
 * ��json�������л�
 * @name icinfo.json.stringify
 * @function
 * @grammar icinfo.json.stringify(value)
 * @remark
 * �÷�����ʵ����ecma-262������й涨��JSON.stringify��ͬ,��ʱֻ֧�ִ���һ����������������й��ܷḻ��
 * @meta standard
 * @see icinfo.json.parse,icinfo.json.encode
 *
 * @returns {string} ���л�����ַ���
 */
icinfo.json.stringify = (function() {
    /**
     * �ַ�������ʱ��Ҫת����ַ���
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"': '\\"',
        "\\": '\\\\'
    };

    /**
     * �ַ������л�
     * @private
     * @param {String} source
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g,
                function(match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00"
                    + Math.floor(c / 16).toString(16)
                    + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }

    /**
     * �������л�
     * @private
     * @param {String} source
     */
    function encodeArray(source) {
        var result = ["["],
        l = source.length,
        preComma, i, item;

        for (i = 0; i < l; i++) {
            item = source[i];

            switch (typeof item) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (preComma) {
                        result.push(',');
                    }
                    result.push(icinfo.json.stringify(item));
                    preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }

    /**
     * �����������л�ʱ�Ĳ���
     * @private
     * @param {String} source
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }

    /**
     * �������л�
     * @private
     * @param {String} source
     */
    function encodeDate(source) {
        return '"' + source.getFullYear() + "-"
        + pad(source.getMonth() + 1) + "-"
        + pad(source.getDate()) + "T"
        + pad(source.getHours()) + ":"
        + pad(source.getMinutes()) + ":"
        + pad(source.getSeconds()) + '"';
    }

    return function(value) {
        switch (typeof value) {
            case 'undefined':
                return 'undefined';

            case 'number':
                return isFinite(value) ? String(value) : "null";

            case 'string':
                return encodeString(value);

            case 'boolean':
                return String(value);

            default:
                if (value === null) {
                    return 'null';
                } else if (value instanceof Array) {
                    return encodeArray(value);
                } else if (value instanceof Date) {
                    return encodeDate(value);
                } else {
                    var result = ['{'],
                    encode = icinfo.json.stringify,
                    preComma,
                    item;

                    for (var key in value) {
                        if (Object.prototype.hasOwnProperty.call(value, key)) {
                            item = value[key];
                            switch (typeof item) {
                                case 'undefined':
                                case 'unknown':
                                case 'function':
                                    break;
                                default:
                                    if (preComma) {
                                        result.push(',');
                                    }
                                    preComma = 1;
                                    result.push(encode(key) + ':' + encode(item));
                            }
                        }
                    }
                    result.push('}');
                    return result.join('');
                }
        }
    };
})();


/**
 * ��json�������л�,Ϊ��ʱ�ӿ�,���ᱻicinfo.json.stringify����
 * @name icinfo.json.encode
 * @function
 * @grammar icinfo.json.encode(value)
 * @param {JSON} value ��Ҫ���л���json����
 * @meta out
 * @see icinfo.json.decode,icinfo.json.stringify
 *
 * @returns {string} ���л�����ַ���
 */
icinfo.json.encode = icinfo.json.stringify;



icinfo.forEach = function( enumerable, iterator, context ) {
    var i, n, t;
    if ( typeof iterator == "function" && enumerable) {
        // Array or ArrayLike or NodeList or String
        if ( typeof enumerable.length == "number" ) {
            for ( i=0, n=enumerable.length; i<n; i++ ) {
                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));
                // ��ѭ��ִ�еĺ�����Ĭ�ϻᴫ����������(array[i], i, array)
                iterator.call( context || null, t, i, enumerable );
            }
        // enumerable is number
        } else if (typeof enumerable == "number") {
            for (i=0; i<enumerable; i++) {
                iterator.call( context || null, i, i, i);
            }
        // enumerable is json
        } else if (typeof enumerable == "object") {
            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    iterator.call( context || null, enumerable[ i ], i, enumerable );
                }
            }
        }
    }
    return enumerable;
};

icinfo.type = (function() {
    var objectType = {},
    nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
    str = "Array Boolean Date Error Function Number RegExp String",
    toString = objectType.toString;

    // �� objectType ���ϸ�ֵ������ӳ��
    icinfo.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        icinfo[ "is" + name ] = function ( unknow ) {
            return icinfo.type(unknow) == name.toLowerCase();
        }
    });

    // ��������
    return function ( unknow ) {
        var s = typeof unknow;

        return s != "object" ? s
        : unknow == null ? "null"
        : unknow._type_
        || objectType[ toString.call( unknow ) ]
        || nodeType[ unknow.nodeType ]
        || ( unknow == unknow.window ? "Window" : "" )
        || "object";
    };
})();








////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace data/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * �ṩ���ݻ��湦��
 * @namespace icinfo.data
 */
icinfo.data = icinfo.data || {};

/**
 * �������ݹ���ӿ�
 * @param {String} key �洢��������
 * @param {Everything} value ��Ҫ�洢����������
 * @return {Everything} ���ر��洢������
 */
icinfo.data.set = function(key, value) {
    var top = window.top,
    cache = top['$ICINFO_CACHE$'] || {};
    top['$ICINFO_CACHE$'] = cache;

    return cache[key] = value;
};

/**
 * �������ݹ���ӿ�
 * @param {String} key �洢��������
 * @return {Everything} ���ر���ѯ������
 */
icinfo.data.get = function(key) {
    var top = window.top,
    cache = top['$ICINFO_CACHE$'] || {};
    top['$ICINFO_CACHE$'] = cache;

    return cache[key];
};

/**
 * ���ݹ���ɾ���ӿ�
 * @param {String} key ɾ����������
 */
icinfo.data.remove = function(key) {
    var cache = window.top['$ICINFO_CACHE$'];
    if (cache && cache[key])
        delete cache[key];
};

/**
 * ���ݹ�������ӿ�
 * @example
 * step1:
 * icinfo.data.set("key1", "value1");
 * icinfo.data.set("key1", "value1");
 * console.log();
 * step2:
 * icinfo.data.clear();
 * console.log();
 */
icinfo.data.clear = function() {
    window.top['$ICINFO_CACHE$'] = {};
};

/**
 * �������ݹ���ӿ�
 * @return {Object} ���ر���ѯ������
 */
icinfo.data.getAll = function() {
    var top = window.top,
    cache = top['$ICINFO_CACHE$'] || {};
    top['$ICINFO_CACHE$'] = cache;
    return cache;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace loader///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
icinfo.loader = {};

/**
 *
 * @param {type} url
 * @param {type} callback
 * @returns {undefined}
 */
icinfo.loader.css = function(url, callback) {

    var head = document.getElementsByTagName("HEAD")[0];
    var css = document.createElement("link");
    console.log("link>> created");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url += (url.indexOf('?') > 0 ? '&' : '?');

    head.insertBefore(css, head.firstChild);

    if (callback)
        callback();
};

/**
 *
 * @param {type} url
 * @param {type} callback
 * @returns {undefined}
 */
icinfo.loader.js = function(url, callback) {

    var head = document.getElementsByTagName("HEAD")[0];

    var script = document.createElement("script");
    console.log("script>> created");
    script.src = url += (url.indexOf('?') > 0 ? '&' : '?') + "_timestamp=" + ~new Date;
    script.charset = "utf-8";
    script.async = false;
    console.log("script>> src attr setted >>> ", url);

    head.insertBefore(script, head.firstChild);

    console.log("script>> loading...");

    script.onload = script.onreadystatechange = function() {
        console.log("script>> script.onreadystatechanged >>> ", this.readyState);
        if ((!this.readyState) || this.readyState === "loaded" || this.readyState === "complete") {
            //if(!head.done[name]){
            //console.log("script>> load fail1");
            //head.removeChild(script);
            //}
            if (callback)
                callback();
        }
    };
    script.onerror = function() {
        script.onload = script.onerror = undefined;
        console.log("script>> load fail");
        head.removeChild(script);
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace api//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @type type
 */
icinfo.api = {
    proxy: ""
};

/**
 *
 * @param {type} message
 * @returns {undefined}
 */
icinfo.api.getApp = function(message) {

    };

/**
 *
 * @param {type} message
 * @returns {undefined}
 */
icinfo.api.getAppWindow = function(message) {

    };

/**
 *
 * @param {type} message
 * @returns {unresolved}
 */
icinfo.api.message = function(message) {

    if (icinfo.api.proxy === "") {
        console.log("icinfo.api.proxy is undefined");
        return;
    }

    icinfo.api.send("message", {
        message: message
    });
};

/**
 *
 * @param {type} options
 * @returns {unresolved}
 */
icinfo.api.dialog = function(options) {

    if (icinfo.api.proxy === "") {
        console.log("icinfo.api.proxy is undefined");
        return;
    }

    icinfo.api.send("dialog", options);
};

/**
 * ����������
 * �����ܳ��Ȳ��ܲٹ�2000(ie)
 * @param {String} type api�ص�����
 * @param {Any} options ��������,����
 * @returns {unresolved}
 */
icinfo.api.send = function(type, options) {

    var id = "proxy_" + new Date().getTime();
    var obj = {
        proxy: id,
        type: type,
        data: options
    };

    var hash = encodeURIComponent(icinfo.json.encode(obj));
    var src = icinfo.api.proxy + "#" + hash;

    if (icinfo.ie && src.length > 2000) {
        console.log("icinfo.api.proxy: Message Body Is Too Large.");
        return;
    }

    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.name = iframe.id = obj.proxy;
    iframe.style.display = "none";

    document.body.insertBefore(iframe);

    console.log("proxy>>> ", icinfo.api.proxy + "#" + hash);
};





////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace form/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ������
 * @type type
 */
icinfo.form = {};

/**
 * �����
 * @param {String} name �ύ����̨�Ķ�����
 * @param {Array[Object]} data ������
 * @param {Object} render ������Ⱦ��
 * @return ��
 */
icinfo.form.arrayToInput = function(name, data, render) {
    var input = [];
    $.each(data, function(i, n) {
        for (var key in n) {
            input.push("<input type='hidden' name='" + name + "[" + i + "]." + key + "' value='" + (render && render[key] ? render[key](n[key], n, this) : n[key]) + "' />\n");
        }
    });
    return input.join("");
};

/**
 * �����������л�
 * @param {String} name �ύ����̨�Ķ�����
 * @param {Array[Object]} data ������
 * @param {Object} render ������Ⱦ��
 * @return ��
 */
icinfo.form.arraySerialize = function(name, data, render) {
    if (typeof name !== "string") {
        return {};
    }
    var serialize = {};
    $.each(data, function(i, n) {
        for (var key in n) {
            serialize[name + "[" + i + "]." + key] = render && render[key] ? render[key](n[key], n, this) : n[key];
        }
    });
    return serialize;
};

/**
 * ����֤
 */
icinfo.form.validate = function() {
    return;
};


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace seal/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ǩ�²���
 */
icinfo.seal = {
    /**
     * ��ǰ�������д��ڵ�ӡ�¶���
     * @type Object
     */
    list: {},
    /**
     * ����ӡ�·����� host
     * ����Ҳ�������Զ����ӡ�¿��ƶ����л�ȡhostԪ������
     * @type String
     */
    host: "",
    /**
     * ӡ�¿��ƶ���
     * ԭ objImpl ����
     */
    controller: {},
    defaults: {
        errors: [],
        namespace: "hxseal",
        top: 0,
        left: 0,
        height: 161,
        width: 161,
        position: "absolute",
        // ӡ��Ԫ������ id
        id: "",
        /**
         * ��Ҫǩ��������
         * @type String
         */
        content: "",
        // ��ҵ����
        entName: "",
        className: "",
        classid: "clsid:3C78C8A9-AF7C-4430-A332-21A2D59F9AEA",
        codeBase: "http://202.75.221.19/update/e7/hxseal.cab#1,0,1,3",
        strEnterpriseName: "",
        // ǩ��id
        SignatureID: "",
        // ǩ��֤��
        SignatureCert: "",
        // ǩ��ֵ
        iGetSignData: "",
        /**
         * sealElement, controller, options
         * @type @exp;icinfonoop
         */
        success: icinfo.noop,
        /**
         *
         * @type @exp;icinfonoop
         */
        error: icinfo.noop,
        onControllerInit: icinfo.noop,
        onSealInit: icinfo.noop,
        onSealCreate: icinfo.noop,
        onSealCreateComplete: icinfo.noop
    }
};

// �����ĵ�
//iAttemptDelete()	iAttemptDelete(pdispElement, pdispControl)	void
//iAttemptPrintOut()	iAttemptPrintOut(lReverse)	void
//iAttemptProtect()	iAttemptProtect(pdispControl, lFlag)	void
//iAttemptUnprotect()	iAttemptUnprotect(pdispControl)	void

//
//iBindContainer()	iBindContainer(pdispContainer)	void
//iCtrlMenuModify()	iCtrlMenuModify(pdispControl, lMenuID, sAdd)	void
//iDisplayInfo()	iDisplayInfo(pdispControl)	void
//iEndPrint()	iEndPrint(pdispControl, lCtrlVisible)	void
//iErrorCode()	iErrorCode(sErrorType)	Number
//iFillControl()	iFillControl(pdispElement, pdispControl)	void
// free
//iFinalize()	iFinalize()	void
// office xy
//iGetControlCenterX()	iGetControlCenterX(pdispControl)	Number
//iGetControlCenterY()	iGetControlCenterY(pdispControl)	Number
//
//iGetElementAttribute()	iGetElementAttribute(pdispControl, bstrName)	String
// ��ȡ�����ļ�
//iGetOption()	iGetOption(lType)	Variant
// ҳ��ӡ�µ�У��
//iHtmlSealVerify()	iHtmlSealVerify(bstrData, pdispControl)	void

//
//iInitControl()	iInitControl(pdispElement, pdispControl)	void
// ǩ��ǰ�ĳ�ʼ��
//iInitialize()	iInitialize()	void
// ����Ƿ���ɳ�ʼ��
//iIsInitialized()	iIsInitialized()	Number
// ����ӡ��
//iLoadHtmlSeal()	iLoadHtmlSeal(lID, bstrContentMask, lLeft, lTop)	void
// ����ӡ�� office
//iLoadSeal()	iLoadSeal(pdispElement, pdispControl)	void
// ��ȡ����������
//iLoadServerConfig()	iLoadServerConfig(bstrPath)	void
//iMenuControl()	iMenuControl(lControlMode)	void
//iOption()	iOption(lOptionType)	void
// office ����
//iSaveSeal()	iSaveSeal(pdispControl)	void
// ǩ���¼�
//iSealSign()	iSealSign(bstrDataforsign, bstrContentMask, lLeft, lTop)	void
//iSealSignEx()	iSealSignEx(bstrData, ulDataFlag, bstrDataforsign, bstrContentMask, lLeft, lTop)	void
// ��֤
//iSealVerify()	iSealVerify(bstrDataforsign, pdispControl)	void
//
//iShieldNotify()	iShieldNotify(lReverse)	void
//iStartPrint()	iStartPrint(pdispControl, lReqPrintCount, lCtrlVisible)	void
//iSyncLoadHtmlSeal()	iSyncLoadHtmlSeal(lID, bstrContentMask, lLeft, lTop)	void
//UploadSignInfo=http://192.168.1.254:8084/tseal/external/localSignedAction.do
//* attribute: RemoteSignUrl
//RemoteSign=http://192.168.1.254:8084/tseal/external/remoteSignedAction.do
//* attribute: DownloadSignInfoUrl
//DownloadSignInfo=http://192.168.1.254:8084/tseal/external/getSignedInfoAction.do
//* attribute: DownloadSignCertUrl
//DownloadSignCert=http://192.168.1.254:8084/tseal/external/getSignedCertAction.do
//* attribute: DownloadSignImgUrl
//DownloadSignImg=http://192.168.1.254:8084/tseal/external/getSignedImgAction.do
//* attribute: RemoteVerifyUrl
//RemoteVerify=http://192.168.1.254:8084/tseal/external/checkSignInfoAction.do
//* attribute: DownloadUserInfoUrl
//DownloadUserInfo=http://192.168.1.254:8084/tseal/external/getCertuserSealAction.do
//* attribute: DownloadThumbnailUrl
//DownloadThumbnail=http://192.168.1.254:8084/tseal/external/seal-rest.do?
//* attribute: LockUrl
//Lock=http://192.168.1.254:8084/tseal/external/LockDocumentAction.do
//* attribute: UnLockUrl
//UnLock=http://192.168.1.254:8084/tseal/external/getLockPasswordAction.do
/**
 *
 * @type type
 */
icinfo.seal.server = {
    UploadSignInfoUrl: "/tseal/external/localSignedAction.do",
    RemoteSignUrl: "/tseal/external/remoteSignedAction.do",
    DownloadSignInfoUrl: "/tseal/external/getSignedInfoAction.do",
    DownloadSignCertUrl: "/tseal/external/getSignedCertAction.do",
    DownloadSignImgUrl: "/tseal/external/getSignedImgAction.do",
    RemoteVerifyUrl: "/tseal/external/checkSignInfoAction.do",
    DownloadUserInfoUrl: "/tseal/external/getCertuserSealAction.do",
    DownloadThumbnailUrl: "/tseal/external/seal-rest.do?",
    LockUrl: "/tseal/external/LockDocumentAction.do",
    UnLockUrl: "/tseal/external/getLockPasswordAction.do"
//    UploadSignInfoUrl: "/rest/sign-rest!localSignedXML.xml",
//    RemoteSignUrl: "/rest/sign-rest!remoteSignedXML.xml",
//    DownloadSignInfoUrl: "/rest/sign-rest!getSignedInfoXML.xml",
//    DownloadSignCertUrl: "/rest/sign-rest!getSignedCertXML.xml",
//    DownloadSignImgUrl: "/rest/sign-rest!getSignedImgXML.xml",
//    RemoteVerifyUrl: "/rest/sign-rest!checkSignInfoXML.xml",
//    DownloadUserInfoUrl: "/rest/user-rest!getSealsOfUserByCertXML.xml",
//    DownloadThumbnailUrl: "/rest/seal-rest"
};

/**
 *
 * @type type
 */
icinfo.seal.events = {
    /**
     * ����ӡ���¼�
     */
    OnPreCreateSealElement: "create",
    OnElementResize: "resize",
    OnRemoteVerifyEnd: "verify",
    OnRemoteVerifyError: "verifyError",
    OnSignEnd: "sign",
    OnElementDelete: "remove"
};

/**
 *
 * @type type
 */
icinfo.seal.event = {
    /**
     *
     * @param {type} options
     * @returns {unresolved}
     */
    create: function(options) {
        var sealElement = document.createElement("object");
        sealElement.setAttribute("classid", "clsid:3C78C8A9-AF7C-4430-A332-21A2D59F9AEA");
        sealElement.style.position = options.position;
        sealElement.style.top = parseInt(options.top, 10) + "px";
        sealElement.style.left = parseInt(options.left, 10) + "px";
        sealElement.style.width = parseInt(options.width, 10) + "px";
        sealElement.style.height = parseInt(options.height, 10) + "px";
        try {
            var controller = icinfo.seal.define(options.namespace);
            document.body.appendChild(sealElement);
            controller.iShieldNotify(0);
            controller.iInitControl(sealElement, sealElement);
            controller.iFillControl(sealElement, sealElement);
            if (!icinfo.seal.list[options.namespace]) {
                icinfo.seal.list[options.namespace] = [];
            }
            sealElement.signId = sealElement.SignatureID;

            icinfo.seal.list[options.namespace].push({
                options: options,
                seal: sealElement
            });
            /**
             * ǩ��id: sealElement.SignatureID
             * ǩ��֤��: sealElement.SignatureCert
             * ǩ��ֵ: sealElement.iGetSignData()
             */
            options.success(sealElement, controller, options);
        } catch (e) {
            options.error("message", e.message);
        }
    },
    resize: function() {
    },
    verify: function() {
    },
    verifyError: function() {
    },
    sign: function() {
    },
    remove: function() {
    },
    /**
     *
     * @param {type} seal
     * @param {type} val
     */
    width: function(seal, val) {
        if (!val) {
            seal.style.width = parseInt(val) + "px";
        }
        return parseInt(seal.style.width, 10);
    },
    /**
     *
     * @param {type} seal
     * @param {type} val
     */
    height: function(seal, val) {
        if (!val) {
            seal.style.width = parseInt(val) + "px";
        }
        return parseInt(seal.style.width, 10);
    },
    /**
     *
     * @param {type} seal
     * @param {type} offset
     * @returns {icinfo.seal.defaults.offset.Anonym$2}
     */
    offset: function(seal, offset) {
        if (!offset) {
            seal.style.top = parseInt(offset.top || 0) + "px";
            seal.style.top = parseInt(offset.top || 0) + "px";
        }
        return {
            top: parseInt(seal.style.top, 10),
            left: parseInt(seal.style.left, 10)
        };
    }
};

/**
 * �Զ���ӡ�¿�����
 * @param {String} namespace �����������ռ�
 * @param {string|HTMLObjectElement} controller �����������ռ�
 * @param {String} callback �����������ռ�
 *
 * <object id="test" classid="CLSID:8040AA3B-40EC-4038-8EE1-1A1D6198FDE2" width="0" height="0" sealurl="aaa" ></object>
 */
icinfo.seal.define = function(namespace, controller, callback) {
    if (namespace in this.controller) {
        if (callback)
            callback(this);
        return this.controller[namespace];
    }
    // ��ȡ
    var controllerElement = icinfo.isString(controller) ? document.getElementById(controller) : controller;
    if (!controllerElement) {
        controllerElement = document.createElement("object");
        controllerElement.id = namespace;
        controllerElement.style.display = "none";
        controllerElement.setAttribute("classid", "CLSID:8040AA3B-40EC-4038-8EE1-1A1D6198FDE2");
        document.body.appendChild(controllerElement);
    }
    this.controller[namespace] = controllerElement;

    if (callback)
        callback(this);
    return this.controller[namespace];
};

/**
 *
 * @param {type} options
 * @return controller
 */
icinfo.seal.init = function(options) {
    options.errors = [];
    var _seal = this;
    // 1.��ⳡ��
    if (!icinfo.ie || !options.namespace || _seal.host.replace(/ /g, "") === "") {
        options.errors.push("message", "Icinfo Seal Environment Error.");
        return null;
    }
    if (options.namespace in this.controller) {
        return this.controller[options.namespace];
    }
    /**
     * @type Element
     */
    var controller = this.define(options.namespace, options.namespace);
    // 2.������������
    try {
        // ��ʼ��������
        controller.iInitialize();
        // ���ÿ���������·��
        icinfo.object.each(_seal.server, function(v, k) {
            controller[k] = _seal.host + "" + v;
        });

        // 3.�������¼���
        controller.attachEvent("OnPreCreateSealElement", function() {
            _seal.event.create(options);
        });

        // 0 Ϊ��ʼ���ɹ�
        if (0 !== controller.iIsInitialized()) {
            options.errors.push("message", "Icinfo Seal Controller Is Not Initialized.");
            return null;
        }

    } catch (e) {
        options.error("message", "Icinfo Seal Controller Initialize Error.", options.errors);
    }

    // 4.���ؿ�����
    return this.controller[options.namespace];
};

/**
 *
 * @param {type} controller
 */
icinfo.seal.error = function(controller) {
    var ex = {
        cus: 0,
        sys: 0
    };
    try {
        ex.cus = controller.iErrorCode(0);
        ex.sys = controller.iErrorCode(1);
    } catch (e) {
    }

    return ex;
};

/**
 * �����
 * @param {type} settings
 */
icinfo.seal.create = function(settings) {
    var _seal = this;
    // �ϲ�ӡ����Ⱦ����
    var options = icinfo.extend(this.defaults, settings);
    options.signId = (options.signId || options.SignatureID || "").toString();
    if (options.signId.replace(/ /g, "") !== "") {
        this.load(settings);
        return;
    }
    var controller = null;
    try {
        controller = _seal.init(options);
        if (controller === null) {
            options.errors.push("message", "Icinfo Seal Controller Is Not Defined.");
            return;
        }
    } catch (e) {
        options.error("error", e.message, options.errors);
        return;
    }

    //try {

        if(options.entName.length === 0){
            controller.iSealSign(options.content, "MaskContent", 0, 0);
        }else{
            controller.iSealSignEx(options.entName, 0, options.content, "MaskContent", 0, 0);
        }
        //alert(1);
    //} catch (e) {
        //options.error("error", _seal.error(controller), options.errors);
        //return;
    //}
};

/**
 * �����
 * @param {type} settings
 */
icinfo.seal.load = function(settings) {
    var _seal = this;
    // �ϲ�ӡ����Ⱦ����
    var options = icinfo.extend(this.defaults, settings);
    if (!options.signId || options.signId.toString().replace(/ /g, "") === "") {
        options.error("message", "Icinfo Seal signId Is Not Defined.", options.errors);
        return;
    }
    var controller = null;
    try {
        controller = _seal.init(options);
        if (controller === null) {
            options.error("message", "Icinfo Seal Controller Is Not Defined.", options.errors);
            return;
        }
    } catch (e) {
        options.error("error", e.message, options.errors);
        return;
    }

    try {
        controller.iLoadHtmlSeal(options.signId, 2759, 0, 0);
    } catch (e) {
        options.error("error", _seal.error(controller), options.errors);
        return;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////namespace cert/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * ���Ű�ȫ�ؼ�
 */
icinfo.cert = {
    version: "1.0.1",
    host: "",
    ra: "",
    i18n: "zh-cn",
    defaults: {
        errors: [],
        support: "1;3",
        namespace: "HX_CERT",
        controller: null,
        nbxh: "",
        randCode: "",
        myKey: "",
        keytype: "",
        keysn: "",
        data: {},
        timeout: 30000,
        onGetKeyCount: function(){
            return true;
        },
        onGetCertCount: function(){
            return true;
        },
        onBeforeFormat: function(){
            return true;
        },
        onFormat: icinfo.noop(),
        onAfterFormat: icinfo.noop(),
        onInit: icinfo.noop(),
        success: icinfo.noop(),
        error: icinfo.noop()
    },
    ERR: {
        render: function(id, param) {
            var _cert = icinfo.cert;
            var str = this[_cert.i18n]&&this[_cert.i18n][id]&&this[_cert.i18n][id];
            if(typeof param == "undefined"){
                return str;
            }
            if(!icinfo.isObject(param)||!icinfo.isArray(param)){
                str = str.replace(new RegExp("\\{0\\}", "gi"), param);
            }
            if(icinfo.isObject(param)){
                icinfo.object.each(param, function(n, i){
                    str = str.replace(new RegExp("\\{"+i+"\\}", "gi"), n);
                });
            }
            if(icinfo.isArray(param)){
                icinfo.array.map(param, function(n, i){
                    str = str.replace(new RegExp("\\{"+i+"\\}", "gi"), n);
                });
            }
            return str;
        },
        "en-us": {
            1: "Icinfo Cert Environment Error.",
            2: "Icinfo Cert Key SetSupportKeyTypes({0}) Error.",
            3: "Icinfo Cert Key Count({0}) Error.",
            4: "Icinfo Cert Controller Initialize Error.",
            5: "Icinfo Cert Controller Is Not Defined.",
            6: "Icinfo Cert Get Ra Server Error When KeyType Is {0}.",
            7: "Icinfo Cert Format Error(rastate is {0}).",
            8: "Icinfo Cert Format Error.",
            9: "Icinfo Cert Host Is Not Defined.",
            10: "Icinfo Cert jQuery Is Not Defined.",
            11: "Icinfo Cert CertCount({0}) Over 1 Is Not Allowed, Please Format Key First.",
            12: "Icinfo Cert Ra Error ({0} {1} {2}).",
            13: "Icinfo Cert Create Error.",
            14: "Icinfo Cert Can Not Caught Key Info Error.",
            15: "Icinfo Cert Can Not Caught Key Serial Number Error."
        },
        "zh-cn": {
            1: "���Ű�ȫ�ؼ��������ʧ�ܡ�",
            2: "���Ű�ȫ�ؼ�����key����({0})�쳣��",
            3: "���Ű�ȫ�ؼ����key����({0})�쳣��",
            4: "���Ű�ȫ�ؼ���ʼ��ʧ�ܡ�",
            5: "���Ű�ȫ�ؼ��޷���ȡ��",
            6: "���Ű�ȫ�ؼ�û�ж���RA�����ַ��Key����Ϊ{0}ʱ��",
            7: "���Ű�ȫ�ؼ���ʽ��ʧ��(RA״̬��Ϊ{0})��",
            8: "���Ű�ȫ�ؼ���ʽ��ʧ��",
            9: "���Ű�ȫ�ؼ���֤ʧ�ܣ�֤�鴦������ַû�����á�",
            10: "���Ű�ȫ�ؼ���֤ʧ�ܣ�û��jQuery������",
            11: "���Ű�ȫ�ؼ���֤ʧ�ܣ�Key����{0}������֤���ǲ�����ģ�����ִ�и�ʽ����",
            12: "���Ű�ȫ�ؼ���֤ʧ�ܣ�RA�����˴���{0} {1} {2}��",
            13: "���Ű�ȫ�ؼ���֤ʧ�ܡ�",
            14: "���Ű�ȫ�ؼ���֤ʧ�ܣ��޷���ȡKey��Ϣ���������û�ȡ���˲�����",
            15: "���Ű�ȫ�ؼ���֤ʧ�ܣ��޷���ȡKey���кš�"
        }
    },
    event: {
        onCreateZJCARequest: icinfo.noop,
        onCreatePKCS10request: icinfo.noop,
        onInstallPKCS7X509Cert: icinfo.noop,
        onInstallPfxCert: icinfo.noop,
        /**
         * ����Key����
         */
        onSetKeyTypes: icinfo.noop,
        /**
         * ��ȡKey����
         */
        onGetKeyCount: icinfo.noop,
        /**
         * ��ȡ֤������
         */
        onGetCertCount: icinfo.noop,
        /**
         * ��ȡ���µ�֤��
         */
        onGetLastCert: icinfo.noop,
        /**
         * ��ȡKey����
         */
        onGetKeyType: icinfo.noop,
        /**
         * ��ȡsn
         */
        onGetSn: icinfo.noop,
        /**
         * ��ȡkey��Ϣ
         */
        onGetKeyInfo: icinfo.noop,
        /**
         * ��ȡCSP�б�
         */
        onGetGetCspList: icinfo.noop,
        /**
         * ��ȡ���Ĵ���
         */
        onGetErr: icinfo.noop,
        /**
         * ��ʽ��
         */
        onFormatKey: icinfo.noop,
        /**
         * ����
         */
        onUnLockey: icinfo.noop,
        /**
         * ��֤
         */
        onCreateZJCACert: icinfo.noop
    }
};

/**
 *
 * CLSID:1DECBA92-5007-4A94-BDF7-BC4B553D3BCB
 * @return controller
 */
icinfo.cert.define = function(namespace){
    if (!this.controller) {
        var controllerElement = document.createElement("object");
        controllerElement.id = namespace;
        controllerElement.style.display = "none";
        controllerElement.setAttribute("classid", "CLSID:1DECBA92-5007-4A94-BDF7-BC4B553D3BCB");
        document.body.insertBefore(controllerElement);
        this.controller = controllerElement;
    }
    return this.controller;
};

/**
 * @return controller
 */
icinfo.cert.init = function(options){
    options.errors = [];
    var _cert = this;

    // 1.��ⳡ��
    if (!icinfo.ie || !options.namespace) {
        options.errors.push(_cert.ERR.render(1));
        return null;
    }
    /**
     * @type Element
     */
    this.controller = this.define(options.namespace);

    // 2.������������
    try {
        // ���� ֧�ֵ�KEY����
        var setSupportKeyTypes = _cert.setKeyTypes(_cert.controller, options.support);
        if(setSupportKeyTypes != 0){
            options.errors.push(_cert.ERR.render(2, setSupportKeyTypes));
            return;
        }
        //���KEY���������������1�����쳣
        var keyCount = _cert.controller.GetKeyCount();
        // ���KEY����
        if(options.onGetKeyCount(keyCount, _cert) == false){
            return;
        }
        if(keyCount != 1){
            options.errors.push(_cert.ERR.render(3, keyCount));
            return;
        }

    } catch (e) {
        options.errors.push(_cert.ERR.render(4));
    }
    options.onInit(this.controller);
    // 4.���ؿ�����
    return this.controller;
};

/**
 * ���ɷ����㽭CAҪ���֤������
 * ����Ǹ��key������CMP��������ǷǸ��key����������key������P10����
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return �������ɵ�֤���������Ϊ����ʧ�ܣ�����ɹ�
 */
icinfo.cert.createZJCARequest = function(controller){
    var req = controller ? controller.CreateZJCACertRequest(): this.controller.CreateZJCACertRequest();
    this.event.onCreateZJCARequest(req);
    return req;
};

/**
 * ��ȡ��ǰ����Key����֤�����
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return key����֤�����,С��0����ʾ����
 */
icinfo.cert.getCertCount = function(controller){
    var req = controller ? controller.GetCertCountInKey(): this.controller.GetCertCountInKey();
    this.event.onGetCertCount(req);
    return req;
};

/**
 * ��װZJCA���ص�����
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param cert ���ص���������Ƿ�����key˫֤��ǩ��֤��ͼ���֤��һ�鴫�룬���ԷֺŸ���
 * @return 0�ɹ�������ʧ��
 */
icinfo.cert.createZJCACert = function(controller, cert){
    var req = controller ? controller.InstallZJCACert(cert): this.controller.InstallZJCACert(cert);
    this.event.onCreateZJCACert(req);
    return req;
};

/**
 * ����֧�ֵ�key��𣬿��Զ��֡��˺���һ��Ϊ���ȵ��ã��Ժ�������Ĳ����������ڴ˺���ȷ�ϵķ�Χ�ڣ����û�е��ã���Ĭ��֧����������
 * @param {String} types ֧�ֵ�key�����б��ԷֺŸ��������Ҫ�÷ֺŽ�β������ǿվ�֧����������
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return 0�ɹ�����ֵʧ��
 * @example
 * <b>USBkey���ʹ���<b/>
 * 0 ȱʡ���ͣ�Ϊ֧��΢��CSP��key
 * 1 ��ɫ�������key
 * 2 ����3003auto
 * 3 e��ͨ����KEY
 * 4 �г�
 * 5 ��̩
 * 6 IE��֤��
 * 7 ZJCA����KEY
 */
icinfo.cert.setKeyTypes = function(controller, types){
    var req = controller ? controller.SetSupportKeyTypes(types): this.controller.SetSupportKeyTypes(types);
    this.event.onSetKeyTypes(req, types);
    return req;
};

/**
 * �õ�Ŀǰ�����ָ�����͵�key�ĸ�����key�ĳ�ʼ��Ҳ������<br>
 * <b>ע��</b><br>
 * �˺���Ӧ����SetSupportKeyTypes������key��������ǰ���á���Ϊ���а�����key�ĳ�ʼ������Ȼ�ܶ��������Ĭ�ϲ����˺���������ǿ���Ƽ����ȵ���һ�¡�
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return key�ĸ�����С��0����
 * @example
 * var keyCount = icinfo.cert.getKeyCount(controller);
 * alert(keyCount);
 */
icinfo.cert.getKeyCount = function(controller){
    var req = controller ? controller.GetKeyCount(): this.controller.GetKeyCount();
    this.onGetKeyCount(req);
    return req;
};

/**
 * ��ȡ��ǰkey�����µ�֤�����ݣ�������ڶ��key�����ؿ�ֵ
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param certType ����֤������ͣ�0�C�������͡�1�Cǩ����2�C����
 * @return ����֤������,xml��ʽ��������ڶ��key�����ؿ�ֵ
 */
icinfo.cert.getLastCert = function(controller, certType){
    var req = controller ? controller.GetNewestCertInKey(certType): this.controller.GetNewestCertInKey(certType);
    this.event.onGetLastCert(req);
    return req;
};

/**
 * �õ����һ�β����ĳ�����Ϣ�����û�г�����ֵ���ݲ�ȷ�����������ϴεĴ���ֵ����ΪĿǰû����չ���
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return {String} ���һ�β�������Ϣ
 */
icinfo.cert.getErr = function(controller){
    var req = controller ? controller.GetHxLastErrInfo(): this.controller.GetHxLastErrInfo();
    this.event.onGetErr(req);
    return req;
};

/**
 * ʹ��΢���CAPI����p10֤�����󣬱����base64
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return p10֤����������ݣ����ַ�����ʾʧ��
 */
icinfo.cert.createPKCS10request = function(controller){
    var req = controller ? controller.CreatePKCS10requestByCAPI(): this.controller.CreatePKCS10requestByCAPI();
    this.event.onCreatePKCS10request(req);
    return req;
};

/**
 * ��װp10���󷵻ص�PKCS7��X509��Կ֤��
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param cert PKCS7��X509��Կ֤��
 * @return 0�C�ɹ�����ֵΪʧ��,-8888Ϊû��ʵ��
 */
icinfo.cert.installPKCS7X509Cert = function(controller, cert){
    var req = controller ? controller.InstallPKCS7X509CertByCAPI(cert): this.controller.InstallPKCS7X509CertByCAPI(cert);
    this.event.onInstallPKCS7X509Cert(req);
    return req;
};

/**
 * ��װpfx֤�顣���ӿ�һ��������װ����֤��
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param {String} cert pfx֤��
 * @param {String} password pfx֤������
 * @return 0�C�ɹ�����ֵΪʧ��,-8888Ϊû��ʵ��
 */
icinfo.cert.installPfxCert = function(controller, cert, password){
    var req = controller ? controller.InstallPfxCertByCAPI(cert, password): this.controller.InstallPfxCertByCAPI(cert, password);
    this.event.onInstallPfxCert(req);
    return req;
};

/**
 * ��ȡ��ǰ����Key�����ͺţ����ͺź궨���HxConfig.h�ļ�
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return key�����ͺ�,С��0����ʾ����
 */
icinfo.cert.getKeyType = function(controller){
    var req = controller ? controller.GetCurKeyType(): this.controller.GetCurKeyType();
    this.event.onGetKeyType(req);
    return req;
};

/**
 * ��ȡ��ǰ����Key��Ӳ�����кţ�������key�����ؿ�ֵ
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return key�����кţ�������key�����ؿ�ֵ
 */
icinfo.cert.getSn = function(controller){
    var req = controller ? controller.GetKeySN(): this.controller.GetKeySN();
    this.event.onGetSn(req);
    return req;
};

/**
 * �õ���ǰ���ߣ����룩key�����
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @return key�Ĳ����������ʽ�����Ͷ������ƶ��Ÿ����ֺš�1,��ɫ����key,2;3,����3003,1
 */
icinfo.cert.getKeyInfo = function(controller){
    var req = controller ? controller.GetOnlineKeyInfo(): this.controller.GetOnlineKeyInfo();
    this.event.onGetKeyInfo(req);
    return req;
};

/**
 * �õ���ǰϵͳ��csp�б�
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param {Int} flag 1:ָ�����г����еģ�2:ֻ�г�֧�ֵ�
 * @return �õ���ǰϵͳ��csp�б�
 * csp����1,�üǵ�����1,usbkey���ͱ��1;csp����2,�üǵ�����2,usbkey���ͱ��2
 * ���û�ж�Ӧusbkey���ͱ�ž�Ϊ-1."�üǵ�����"��Ӧ�����ļ��е�cn,�����ͱ�š���Ӧ�����ļ��е�type
 */
icinfo.cert.getGetCspList = function(controller, flag){
    var req = controller ? controller.GetSysCspList(flag): this.controller.GetSysCspList(flag);
    this.event.onGetGetCspList(req);
    return req;
};

/**
 * �Ե�ǰkey���и�ʽ��������ж��key������ʧ��
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param url ��ʽ����ַ��һ��Ϊ�������key������key�������óɿ�
 * @return 0�C�ɹ�����ֵΪʧ��
 */
icinfo.cert.formatKey = function(controller, url){
    var req = controller ? controller.FormatKey(url): this.controller.FormatKey(url);
    this.event.onFormatKey(req);
    return req;
};

/**
 * ������ǰkey���������ȱʡ����123456
 * @param {DispHTMLObjectElement} controller ���Ű�ȫ�ؼ�
 * @param url ������֤��url
 * @param code ������֤��
 * @return 0�C�ɹ�����ֵΪʧ��
 */
icinfo.cert.unLockKey = function(controller, url, code){
    var req = controller ? controller.UnLockKey(url, code): this.controller.UnLockKey(url, code);
    this.event.onUnLockey(req);
    return req;
};

/**
 * ��֤
 * @param {Object} settings
 */
icinfo.cert.create = function(settings) {
    var _cert = this;
    // �ϲ�����
    var options = icinfo.extend(this.defaults, settings);
    if( _cert.host.replace(/ /g, "") === ""){
        options.error("message", _cert.ERR.render(9), options.errors);
        return;
    }
    if(!jQuery){
        options.error("message", _cert.ERR.render(10), options.errors);
        return;
    }
    var controller = _cert.init(options);
    if (!controller) {
        options.error("message", _cert.ERR.render(5), options.errors);
        return;
    }

    var certCount = 0;
    var certReq = "";
    var keyType = "";
    var keySn = "";

    try {

        certCount = _cert.getCertCount(controller);
        if(options.onGetCertCount(certCount, certReq, keyType, keySn) == false){
            options.error("message", _cert.ERR.render(11, certCount), options.errors);
            return;
        }
        if(certCount > 1){
            options.error("message", _cert.ERR.render(11, certCount), options.errors);
            return;
        }
        keyType = _cert.getKeyType(controller) == '1' ? "OLDKEY" : "NEWKEY";
        keySn = _cert.getSn(controller);

        if(icinfo.string.trim(keySn) == ""){
            options.error("error", _cert.ERR.render(15), options.errors);
            return;
        }

        certReq = _cert.createZJCARequest(controller);
        if(icinfo.string.trim(certReq) == ""){
            options.error("error", _cert.ERR.render(14), options.errors);
            return;
        }

        jQuery.ajax({
            type : "post",
            dataType : "json",
            url : _cert.host,
            data : {
                "cert.nbxh"    :  options.nbxh,
                "cert.randCode" :  options.randCode,
                "cert.myKey"   :  certReq,
                "cert.keytype" :  keyType,
                "cert.keysn"   :  keySn
            },
            error: function(e1, e2, e3){
                alert("ajax error")
                options.error("error", _cert.ERR.render(12, [e1.toString(), e2.toString(), e3.toString()]));
            },
            success : function(data) {
                var createZJCACertReq = "";
                try{
                    createZJCACertReq = _cert.createZJCACert(controller, data.raCode);
                    if(createZJCACertReq == 0){
                        options.success(data.raCode, certReq, keyType, keySn);
                    }else{
                        //HXRA-150001
                        options.error("error", _cert.ERR.render(12, [data.raCode, "", ""]));
                    }
                }catch(ajaxEx){
                    options.error("error", _cert.ERR.render(12, [data.raCode, ajaxEx.meaasge, ""]));
                }

            }
        });

    } catch (e) {
        options.error("error", _cert.ERR.render(13), (function(a){
            options.errors.push(a);
            try{
                options.errors.push(_cert.getErr(controller));
            }catch(ex){}
            return options.errors.join(", ");
        })(e));
        return;
    }
};

/**
 * ��ʽ��
 * @param {type} settings
 */
icinfo.cert.format = function(settings) {
    var _cert = this;
    // �ϲ�����
    var options = icinfo.extend(this.defaults, settings);
    var controller = _cert.init(options);
    if (!controller) {
        options.error("message", _cert.ERR.render(5), options.errors);
        return;
    }
    var keyType = "";
    var rastate = "";

    try {
        keyType = _cert.getKeyType(controller);
        if(options.onBeforeFormat(keyType, controller) == false){
            return;
        }
        if(keyType == 1 && _cert.ra.replace(/ /g, "") == ""){
            options.error("message", _cert.ERR.render(6, keyType), options.errors);
            return;
        }
        rastate = _cert.formatKey(controller, keyType==1 ? _cert.ra : "");
        if (rastate == 0) {
            options.success(rastate, keyType, controller);
        } else {
            options.errors.push(_cert.ERR.render(7, rastate));
        }

    } catch (e) {
        options.error("error", _cert.ERR.render(8), (function(a){
            options.errors.push(a);
            return options.errors.join(", ");
        })(e), (function(){
            var keyErr = "";
            try{
                keyErr = _cert.getErr(controller);
            }catch(ex){}
            return keyErr;
        })());
    }
};


















/**
 *
 */
icinfo.dom = {

    /**
     * @param {HTMLElement} elem
     * @return {HTMLElement} elem
     * @method _remove
     */
    _remove: function(elem){
        this.empty(elem);
        if ( elem.parentNode ) {
            elem.parentNode.removeChild( elem );
        }
        return elem;
    },
    /**
     * @param {HTMLElement} selector
     * @return {HTMLElement} selector
     * @method remove
     */
    remove: function(selector){
        var _this = this;
        if(icinfo.lang.isArray(selector)){
            var elem, i = 0;
            for ( ; (elem = selector[i]) != null; i++ ) {
                _this._remove(elem);
            }
        }else{
            _this._remove(selector);
        }
        return selector;
    },
    empty: function(selector){
        if(icinfo.lang.isArray(selector)){
            var elem, i = 0;
            for ( ; (elem = selector[i]) != null; i++ ) {
                this._empty(elem);
            }
        }else{
            this._empty(selector);
        }
        return selector;
    },
    _empty: function(elem){
        while ( elem.firstChild ) {
            elem.removeChild( elem.firstChild );
        }
    },
    show: function(elem) {

    },
    hide: function(elem) {

    }

};




icinfo.namespace("icinfo.singleton");

icinfo.singleton = function(fn){
    var result;
    return function(){
        return result || ( result = fn.apply( this, arguments ) );
    }
};

icinfo.namespace("icinfo.ui.progress");

icinfo.ui.progress = {
    version: "1.0.0",
    options: {
        value: 0,
        max: 100,
        top: 0,
        left: 0,
        position: "absolute",
        info: "���Ե�...",
        mask: true,
        change: icinfo.noop,
        complete: icinfo.noop
    },
    min: 0,
    init: function(settings){
        this.options = icinfo.extend(this.options, settings);
        this._init();
        this._info();
        this._refreshValue();
    },
    destroy: function() {
        this.mask.style.display = 'none';
    },
    value: function( newValue, info ) {
        if ( typeof newValue === "undefined" ) {
            return this._value();
        }
        if(typeof info !== "undefined"){
            this.info(info);
        }
        this._setOption( "value", newValue );

        return this;
    },
    info: function( info ) {
        if(typeof info !== "undefined"){
            this._setOption( "info", info );
            this._info();
        }
    },
    _info: function(){
        this.msgDiv.innerHTML = this.options.info || "";
    },
    _init: function(){
        if(!this.element) {
            // ����
            var element = document.createElement("div");
            var valueDiv = document.createElement("div");
            var msgDiv = document.createElement("div");

            this.mask = this.options.mask === true ? icinfo.ui.mask.init() : document.body;
            this.mask.insertBefore(msgDiv);
            this.mask.insertBefore(element);
            element.insertBefore(valueDiv);

            element.className = 'icinfo-ui-progressbar';
            valueDiv.className = 'icinfo-ui-progressbar-value';
            msgDiv.className = 'icinfo-ui-progressbar-msg';

            this.valueDiv = valueDiv;
            this.element = element;
            this.msgDiv = msgDiv;
        }
        this.mask.style.display = 'block';
        return element;
    },
    _refreshValue: function(){
        var value = this.value(),
        percentage = this._percentage();

        if ( this.oldValue !== value ) {
            this.oldValue = value;
            this.options.change.call(this, this);
        }

        this.valueDiv.style.width = percentage.toFixed(0) + "%";
        this.element.setAttribute("aria-valuenow", value);
    },
    _setOption: function( key, value ) {
        if ( key === "value" ) {
            this.options.value = value;
            this._refreshValue();
            if ( this._value() === this.options.max ) {
                this.options.complete.call(this, this);
            }
        }else{
            this.options[key] = value;
        }
    },
    _value: function() {
        var val = this.options.value;
        if ( !icinfo.isNumber(parseInt(val, 10)) ) {
            val = 0;
        }
        return Math.min( this.options.max, Math.max( this.min, val ) );
    },
    _percentage: function() {
        return 100 * this._value() / this.options.max;
    }
};

/**
 * icinfo.ui.mask
 */
icinfo.namespace("icinfo.ui.mask");

/**
 * icinfo.ui.mask Impl
 * ����ʵ��
 *
 * @example
 * //
 * icinfo.ui.mask.init();
 * icinfo.ui.mask.destroy();
 */
icinfo.ui.mask = {
    version: '1.0.0',
    options: {
        parent: document.body,
        position: "absolute"
    },
    init: function(settings){
        this.options = icinfo.extend(this.options, settings);
        this.options.parent = this.options.parent || document.body;
        return this._init();
    },
    destroy: function(){
        this.element.style.display = 'none';
    },
    _init: function(){
        if(!this.element) {
            var element = document.createElement("div");
            element.className = 'icinfo-ui-mask';
            console.log(this.options.parent);
            this.options.parent.insertBefore(element);
            this.element = element;
        }
        this.element.style.display = 'block';
        return this.element;
    }
};

















/**
 * ����
 */
icinfo.loaded = true;