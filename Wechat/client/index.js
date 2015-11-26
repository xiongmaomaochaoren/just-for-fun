
import Ajax from "./util/ajax";

function getSignaturePackage(){
    //生成signaturePackage的url ： 包括query，不包括#后面锚点
    let referrerUrl = location.href.split('#')[0];
    let url = `http://m.we.com:8080/node/wx_signature?referrerUrl=${referrerUrl}`;
    let signaturePackagePromise = Ajax.getJSON(url);
    signaturePackagePromise
        .then( (signaturePackage) => {
            signaturePackage["debug"] = true;
            wx.config(signaturePackage);
            wx.ready(function (){
                alert("ready");
                wx.onMenuShareAppMessage({
                    title: '这是标题', // 分享标题
                    desc: '这是是一段描述', // 分享描述
                    link: 'www.we.com', // 分享链接
                    imgUrl: '', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert("分享成功");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        alert("分享失败");
                    }
                });
                var photoBtn = document.getElementById("photo");
                photoBtn.onclick = function(){
                    alert("80803");
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            var imgDom = document.createElement("img");
                            imgDom.src = localIds;
                            document.body.appendChild(imgDom);
                            alert(localIds);
                        }
                    });
                }
                wx.getNetworkType({
                    success: function (res) {
                        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                        alert(networkType);
                    }
                });
            });
            wx.error( (res) => {
                console.log(res);
            });
        })
        .catch( (error) => {
            console.log(error);
        });
}

getSignaturePackage();
