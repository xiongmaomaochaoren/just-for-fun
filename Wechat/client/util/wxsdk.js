

class WXSdk {
    static getWXSdkPromise(){

        return new Promise( (successCb, failCb) => {
            wx.config(options);
            wx.ready(successCb);
            wx.error(failCb);
        });
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
