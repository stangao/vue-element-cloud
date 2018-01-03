//foreach 兼容空数组用法
//Array.forEach implementation for IE support..
//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0; // Hack to convert O.length to a UInt32
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    timeToChina: function(time){//时间转换成中文
      if(time === "year"){
        return "年"
      }else if(time === "month"){
        return "月"
      }else if(time === "day"){
        return "天"
      }else if(time === "week"){
        return "周"
      }else if(time === "hour"){
        return "小时"
      }else if(time === "minute"){
        return "分"
      }else if(time === "second"){
        return "秒"
      }else{
        return time
      }
    },
    modeToChina: function(mode){//使用方式转换成中文
      if(mode === "exclusive"){
        return "单独使用"
      }else if(mode === "shared"){
        return "共享"
      }else{
        return mode
      }
    },
    dateCut: function(date){//日历截取
      return date.substring(0,10);
    },
    statusToChina: function(mystate){//状态转中文
      let state = mystate.toLocaleLowerCase()
      if(state === "created"){
        return "正常"
      }else if(state === "uncreated"){
        return "异常"
      }else if(state === "active"){
        return "激活"
      }else if(state === "stop" || state === "stopping" || state === "stoped"){
        return "停用"
      }else if(state === "running"){
        return "运行中"
      }else{
        return state
      }
    },
    /**
     * 设置cookie
     * @param string c_name
     * @param string value
     */
    setCookie: function (c_name, value) {
      var exp = new Date()
      exp.setTime(exp.getTime() + 15 * 60 * 1000)
      document.cookie = c_name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"
    },

    /**
     * 获取cookie值
     * @param  string name
     * @return string
     */
    cookie: function (name) {
      let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
      // fix to no-cond-assign
      arr = document.cookie.match(reg)
      if (arr)
        return unescape(arr[2])
      else
        return "";
    }


};
