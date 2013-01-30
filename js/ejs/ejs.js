;(function($){
    // by 司徒正美
    /**
     * 入口函数
     * @param {string} id CSS表达式(用于模取元素然后取得里面的innerHTML作为源码)
     * @param {Object} data  数据包
     * @param  {Object} opts 可选参数,可以自由制定你的定界符
     */
    $.ejs = function( id, data, opts){
        var el, source
        if( !$.ejs.cache[ id] ){
            opts = opts || {}
            var doc = opts.doc || document;
            data = data || {};
            el = $(id, doc)[0];
            if(! el )
                throw "can not find the target element";
            source = el.innerHTML;
            if(!(/script|textarea/i.test(el.tagName))){
                source = $.ejs.filters.unescape( source );
            }
            var fn = $.ejs.compile( source, opts );
            $.ejs.cache[ id ] = fn;
            console.log(fn+"");
        }

        return $.ejs.cache[ id ]( data );
    }
    var isNodejs = typeof exports == "object";
    $.ejs.cache = {};
    $.ejs.filters = {
        //自己可以在这里添加更多过滤器,或者可以到这里面自由提取你喜欢的工具函数
        //https://github.com/RubyLouvre/newland/blob/master/system/lang.js
        escapeHTML:  function (target) {
            return target.replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        },
        unescape: function(target){
            return  target.replace(/"/g,'"')
            .replace(/</g,'<')
            .replace(/>/g,'>')
            .replace(/&/g, "&"); //处理转义的中文和实体字符
            return target.replace(/&#([\d]+);/g, function($0, $1){
                return String.fromCharCode(parseInt($1, 10));
            });
        }
    };
    $.ejs.compile = function( source, opts){
        opts = opts || {}
        var open  = opts.open  || isNodejs ? "<%" : "<&";
        var close = opts.close || isNodejs ? "%>" : "&>";
        var helperNames = [], helpers = []
        for(var name in opts){
            if(opts.hasOwnProperty(name) && typeof opts[name] == "function"){
                helperNames.push(name)
                helpers.push( opts[name] )
            }
        }
        var flag = true;//判定是否位于前定界符的左边
        var codes = []; //用于放置源码模板中普通文本片断
        var time = new Date * 1;// 时间截,用于构建codes数组的引用变量
        var prefix = " ;r += txt"+ time +"[" //渲染函数输出部分的前面
        var postfix = "];"//渲染函数输出部分的后面
        var t = "return function(data){ try{var r = '',line"+time+" = 0;";//渲染函数的最开始部分
        var rAt = /(^|[^\w\u00c0-\uFFFF_])(@)(?=\w)/g;
        var rstr = /(['"])(?:\\[\s\S]|[^\ \\r\n])*?\1/g // /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/
        var rtrim = /(^-|-$)/g;
        var rmass = /mass/
        var js = []
        var pre = 0, cur, code, trim
        for(var i = 0, n = source.length; i < n; ){
            cur = source.indexOf( flag ? open : close, i);
            if( cur < pre){
                if( flag ){//取得最末尾的HTML片断
                    t += prefix + codes.length + postfix
                    code = source.slice( pre+ close.length );
                    if(trim){
                        code = $.trim(code)
                        trim = false;
                    }
                    codes.push( code );
                }else{
                    $.error("发生错误了");
                }
                break;
            }
            code = source.slice(i, cur );//截取前后定界符之间的片断
            pre = cur;
            if( flag ){//取得HTML片断
                t += prefix + codes.length + postfix;
                if(trim){
                    code = $.trim(code);
                    trim = false;
                }
                codes.push( code );
                i = cur + open.length;
            }else{//取得javascript罗辑
                js.push(code)
                t += ";line"+time+"=" +js.length+";"
                switch(code.charAt(0)){
                    case "="://直接输出
                        code = code.replace(rtrim,function(){
                            trim = true;
                            return ""
                        });
                        code = code.replace(rAt,"$1data.");
                        if( code.indexOf("|") > 1 ){//使用过滤器
                            var arr = []
                            var str = code.replace(rstr, function(str){
                                arr.push(str);//先收拾所有字符串字面量
                                return 'mass'
                            }).replace(/\|\|/g,"@");//再收拾所有短路或
                            if(str.indexOf("|") > 1){
                                var segments = str.split("|")
                                var filtered = segments.shift().replace(/\@/g,"||").replace(rmass, function(){
                                    return arr.shift();
                                });
                                for( var filter;filter = arr.shift();){
                                    segments = filter.split(":");
                                    name = segments[0];
                                    args = "";
                                    if(segments[1]){
                                        args = ', ' + segments[1].replace(rmass, function(){
                                            return arr.shift();//还原
                                        })
                                    }
                                    filtered = "$.ejs.filters."+ name +"(" +filtered + args+")"
                                }
                                code = "="+ filtered
                            }
                        }
                        t += " ;r +" +code +";"
                        break;
                    case "#"://注释,不输出
                        break
                    case "-":
                    default://普通逻辑,不输出
                        code = code.replace(rtrim,function(){
                            trim = true;
                            return ""
                        });
                        t += code.replace(rAt,"$1data.")
                        break
                }
                i = cur + close.length;
            }
            flag = !flag;
        }
        t += " return r; }catch(e){ $.log(e);\n$.log(js"+time+"[line"+time+"-1]) }}"
        //  console.log(t)
        var body = ["txt"+time,"js"+time, "filters"]
        var fn = Function.apply(Function, body.concat(helperNames,t) );
        var args = [codes, js, $.ejs.filters];

        return fn.apply(this, args.concat(helpers));
    }
    return $.ejs;
})(jQuery);