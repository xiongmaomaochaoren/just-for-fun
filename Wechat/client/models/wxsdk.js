 import WXShareDataConfig from "./wxShareDataConfig";

/**
    微信分享类
**/
class WXSdk {
    static getWXSdkPromise(url){
              return new Promise( (resolve, reject) => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState != 4){
                            return ;
                        }
                        if(xhr.status == 200){
                            try{
                                let responseJson = JSON.parse(xhr.response);
                                resolve(responseJson);
                            }catch(e){
                                reject(e.message);
                            }
                        }else{
                            reject(xhr.statusText);
                        }
                    };
                    xhr.send();
            }) 
           
    }
    
    static share(signaturePackage,wxShareData){    
            signaturePackage["debug"] = true;
            wx.config(signaturePackage);
            wx.ready(function (){
                wxShareData = WXShareDataConfig.mergeShareDate(wxShareData);

                wx.onMenuShareAppMessage(wxShareData);
                wx.onMenuShareTimeline(wxShareData);
                wx.onMenuShareQQ(wxShareData);
                wx.onMenuShareWeibo(wxShareData);
            });

    }

   
}

export default WXSdk;

