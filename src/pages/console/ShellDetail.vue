/**
* Created by 乃波 on 2017-9-22.
*/
<template lang="html">
  <div class="pageContent">
    <div v-title>{{title}}</div>
    <p class="shellTitle" id="shellTitle">控制台:{{pod}}</p>
     <div id="terminal" @keyup="show($event)"></div>

    </div>
</template>

<script>
  import Terminal from "xterm/dist/xterm.js"
  import xtermCss from 'xterm/dist/xterm.css'
  import  "../../common/jbase64"
  var websocket;
  var term;

  String.prototype.trim = function (char, type) {
    if (char) {
      if (type == 'left') {
        return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
      } else if (type == 'right') {
        return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
      }
      return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
  };


  function send(input){
    doSend(encode(input));
  }
  function encode(txt){
    var e = BASE64.encoder(txt);
    switch (e.length % 4) {
      case 1:
        e += "===";
        break;

      case 2:
        e += "==";
        break;

      case 3:
        e += "=";
        break;

      default:
    }
    return "0"+e;
  }

  function trimStr(str){
  return str.replace(/(^\s*)|(\s*$)/g,"=");
}

  function decodeStrBase64(str)
  {
    let unicode = BASE64.decoder(str);
    var strResult = '';
    for(var i = 0 , len =  unicode.length ; i < len ;++i){
      strResult += String.fromCharCode(unicode[i]);
    }
    return strResult
  }
  function decode(str){
    var txt = decodeStrBase64(str)
    return txt
  }
  function onOpen(evt) {
    doSend("4eyJXaWR0aCI6OTgsIkhlaWdodCI6MzZ9");
  }
  function onClose(evt) {
    term.write("\r\nTerminal Closed!")
  }

  function  onMessage(evt) {
    var txt = decode(evt.data.slice(1));
    term.write(txt)

  }

  function onError(evt) {
    term.write("\r\nConnection Error!")
  }
  function doSend(message) {
    websocket.send(message);
  }


  export default {
  data() {
    return {
      title: "服务资源设置",
      pod:"",
    }
  },
  methods: {
    show:function(ev) {

        let keyCode = ev.keyCode

        var str = String.fromCharCode(keyCode)

        if (keyCode > 31 && keyCode != 127)
          str = ev.key
        send(str)

    },
    init(){
      let screenHeight = window.innerHeight || localStorage.getItem("screenHeight");
      let navBarHeight = localStorage.getItem("navBarHeight") || 51;
      let shellTitleHeight = (document.getElementById("shellTitle").offsetHeight+10) || 56;
      let defaultLine = parseInt((parseInt(screenHeight) - parseInt(navBarHeight) - parseInt(shellTitleHeight))/16)

      var defaultCols = 80;
      var defaultRows = defaultLine || 40;
      term = new Terminal(
        {
          cols: defaultCols,
          rows: defaultRows,
          cursorBlink: true,
          screenKeys: true,
          applicationCursor: true, // Needed for proper scrollback behavior in applications like vi
          mouseEvents: true
        }
    );
      term.open(document.getElementById('terminal'));


      let params = this.$route.params
      this.pod =  decodeURIComponent(params["pod"])
      let token = BASE64.encoder(decodeURIComponent(params["token"]))
      let subprotocol = token.trim("=","right")
      let container = decodeURIComponent(params["container"])
      let wsUri ="wss://10.209.224.161:11000/api/v1/namespaces/"+this.pod+"/exec?stdout=1&stdin=1&stderr=1&tty=1&container="+container+
      "&command=%2Fbin%2Fsh&command=-i&command=-c&command=TERM%3Dxterm%20%2Fbin%2Fsh";
      let protcol=["base64url.bearer.authorization.k8s.io."+subprotocol,"base64.channel.k8s.io"];
      websocket = new WebSocket(wsUri,protcol);

      websocket.onopen = function(evt) {
        onOpen(evt)
      };
      websocket.onclose = function(evt) {
        onClose(evt)
      };
      websocket.onmessage = function(evt) {
        onMessage(evt)
      };
      websocket.onerror = function(evt) {
        onError(evt)
      };

      setInterval(function () {
        doSend("0")
      },30000)
    }

  },
  mounted(){
    this.init();

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/shelldetail.less';
// @import "~_xterm@2.9.2@xterm/dist/xterm.css";
</style>
