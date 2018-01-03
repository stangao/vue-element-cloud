/**
 * Created by zhjb on 2017/9/20.
 */
function getEnv() {
  const host =  location.host;
  if (host.match(new RegExp("^127.0.0.1")) || host.match(new RegExp("^localhost")) || host.match(new RegExp("\^10\."))) {
    return "dev"
  }
  if (host.match(new RegExp("\.((test|sit)\.)"))) {
    return "sit"
  }
  return "prod"
}

function getUserInfo() {
  let userId = localStorage.getItem("userId") || '123';
  return {
    userId: userId,
    userName:'ppt',
  }
}

function getHostUrl(url)
{
  if(/(\.sit\.|\.test\.|localhost|10.15.*|192.*)/.test(url))
    return 'http://wdfapiproxy.10.209.224.161.xip.io/';
  else if(/\.uat\./.test(url))
    return 'http://api.uat.ffan.com/health-api/v1/';
  else
    return 'http://api.ffan.com/health-api/v1/';
}

export default{
   getEnv,
   getUserInfo,
   getHostUrl
}
