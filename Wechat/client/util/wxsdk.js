

class WXSdk {
    static getWXSdkPromise(){
        
    }
    static share(){
        wx.onMenuShareTimeline();
        wx.onMenuShareAppMessage();
    }
}

export default WXSdk;

WXSdk.getWXSdkPromise
    .then(function(){
        WSSdk.share();
    });
