 import WXSdk from "./models/wxsdk";
 	//微信获取签名访问地址prefix
 	const prefixUrl = 'http://m.we.com:8080/node/wx/signature?referrerUrl';
    //微信回调地址
    let referrerUrl = location.href.split('#')[0];
    //微信获取签名访问全地址 
    let url = `{prefixUrl}=${referrerUrl}`;
    //定义分享内容
    let wxShareData = {
   	 	title: "重新定义的title",
   	 	success:function(){
   	 		alert("覆写success方法");
   	 	}
    }
    //分享begin....
	WXSdk.getWXSdkPromise(url)
	     .then((signaturePackage) =>{ 
	        WXSdk.share(signaturePackage,wxShareData);
		 });