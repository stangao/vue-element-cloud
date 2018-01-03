/**
* Created by 军标 on 2017-9-22.
*/
<template lang="html">
  <div class="pageContent">
    <div v-title>{{title}}</div>
    <p class="shellTitle" id="shellTitle">日志界面:{{pod}}</p>
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

  function byteToStr(byteArray) {
    var strResult = '';
    for(var i = 0 , len =  byteArray.length ; i < len ;++i){
      strResult += String.fromCharCode(byteArray[i]);
    }
    return strResult

  }

  function decode(str){
    var txt = decodeStrBase64(str)
    return txt
  }
  function onOpen(evt) {
//    doSend("4eyJXaWR0aCI6OTgsIkhlaWdodCI6MzZ9");
  }
  function onClose(evt) {
    term.write("\r\nTerminal Closed!")
  }

  var index = 0

  function  getIndexStr() {
    if(index<10)
      return "   "+index;
    else if (index<100)
      return "  "+index;
    else if (index<1000)
      return " "+index
    else
      return ""+index

  }

  function  onMessage(evt) {
    var txt = decode(evt.data);
//    console.log(txt)

//    let byteBefore = [0x1b,0x5b,0x34,0x32,0x6d]
//    let byteEnd = [0x1b, 0x5b, 0x30, 0x6d]

    let byteBefore = [0x1b,0x5b,0x33,0x36,0x6d,0x1b,0x5b,0x31,0x6d]
    let byteEnd = [0x1b, 0x5b,0x32,0x31,0x6d,0x1b,0x5b, 0x30, 0x6d]


    term.write(byteToStr(byteBefore) +getIndexStr()+" " + byteToStr(byteEnd) + " " + txt + "\r")
    index++

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
      title: "日志详情",
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
      let terminalWidth = document.getElementById("terminal").offsetWidth
      console.log("###width is "+terminalWidth)
      let defaultLineCols = parseInt(terminalWidth/9)

      var defaultCols = defaultLineCols || 80;
      var defaultRows = defaultLine || 40;
      term = new Terminal(
        {
          cols: defaultLineCols,
          rows: defaultRows,
          cursorBlink: true,
          scrollback: 20000,
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
      let wsUri ="wss://10.209.224.161:11000/api/v1/namespaces/"+this.pod +"/log?follow=true&tailLines=5000&limitBytes=10485760&container="+container;
      let protcol=["base64url.bearer.authorization.k8s.io."+subprotocol,"base64.binary.k8s.io"];
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
    index = 0

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/shelldetail.less';
// @import "~_xterm@2.9.2@xterm/dist/xterm.css";
</style>
