
## 参考文档 

* https://github.com/petehunt/webpack-howto
* [webpack 最佳实践](http://qiutc.me/post/webpack-best-practice-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%83%A8%E7%BD%B2%E7%94%9F%E4%BA%A7.html)

## 使用 

    使用require加载所有的资源,包括js、css、image
    通过publicPath对(js、css、image)连接添加url前缀, cdn等

### css loading

* 默认情况下require的less、sass、css等资源webpack通过style内联到页面

        通过css、less、style loader完成
        

